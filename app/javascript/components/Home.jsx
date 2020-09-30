import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';

const Table = ({columns, data, fetchData, isLoading, pageCount: controlledPageCount, selectedRow, setSelectedRow}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    pageOptions,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  return (
    <>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous Page</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
        <p>Page {pageIndex + 1} of {pageOptions.length}</p>
      </div>
      <table {...getTableProps()} className="table">
        <thead>
            {
              headerGroups.map(hg => (
                <tr {...hg.getHeaderGroupProps()}>
                  {hg.headers.map(col => (
                    <th {...col.getHeaderProps()}>
                      {col.render('Header')}
                    </th>
                  ))}
                </tr>
              ))
            }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr style={selectedRow && selectedRow.id === row.original.id ? { backgroundColor: 'green'}: null} onClick={() => setSelectedRow(row.original)} {...row.getRowProps()}>
                  {
                    row.cells.map(cell => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))
                  }
                </tr>
              )
            })
          }
          {
            isLoading &&
            <tr><td colSpan="1000">Loading...</td></tr>
          }
        </tbody>
      </table>
    </>
  )
};

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState();
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(async ({pageIndex, pageSize}) => {
    const fetchId = ++fetchIdRef.current;

    if (fetchId === fetchIdRef.current) {
      setIsLoading(true);
      const { data: { disclosures, pages } } = await axios.get(`/api/disclosures/index?pageSize=${pageSize}&pageIndex=${pageIndex}`);
      setData(JSON.parse(disclosures));
      setPageCount(pages);
      setIsLoading(false);
    }
  }, []);

  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'issuer.nameofissuer' },
    { Header: 'Employees', accessor: 'currentemployees' },
    { Header: 'Quarter', accessor: (row, i) => `${row.year}Q${row.quarter}`, id: 'quarter' },
    { Header: 'State', accessor: 'issuer.stateorcountry' }
  ], []);

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const price = amount => {
    if (!amount || isNaN(amount)) return;
    return priceFormatter.format(amount);
  };

  return (
    <div className="container">
      <h1>RegCF Dashboard</h1>
      <div className="row">
        <div className="col-6">
          <Table
            columns={columns}
            data={data}
            fetchData={fetchData}
            pageCount={pageCount}
            isLoading={isLoading}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        </div>
        <div className="col-6">
          {
            selectedRow &&
            <div>
              <h2>{selectedRow.issuer.nameofissuer}</h2>
              <ul className="list-group">
                {
                  selectedRow.issuer.issuerwebsite !== 'None' &&
                  <li className="list-group-item">
                    <a href={'http://' + selectedRow.issuer.issuerwebsite} target="_blank">{selectedRow.issuer.issuerwebsite}</a>
                  </li>
                }
                <li className="list-group-item">
                  <address>
                    {selectedRow.issuer.street1}<br/>
                    {
                      selectedRow.issuer.street2 &&
                      <>{selectedRow.issuer.street2}<br/></>
                    }
                    {selectedRow.issuer.city}, {selectedRow.issuer.stateorcountry}
                  </address>
                </li>
                <li className="list-group-item">
                  Current Employees: {selectedRow.currentemployees || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Date of Incorporation: {selectedRow.issuer.dateincorporation || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Offering Amount: {price(selectedRow.offeringamount) || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Max Offering Amount: {price(selectedRow.maximumofferingamount) || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Security Type: {selectedRow.securityofferedtype === "Other" ? selectedRow.securityofferedotherdesc : selectedRow.securityofferedtype || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Legal Status: {selectedRow.issuer.legalstatusform === "Other" ? selectedRow.issuer.legalstatusotherdesc : selectedRow.issuer.legalstatusform || 'Unknown'}
                </li>
                <li className="list-group-item">
                  Jurisdiction: {selectedRow.issuer.jurisdictionorganization || 'Unknown'}
                </li>
              </ul>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Most Recent FY</th>
                    <th>Prior FY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Total Assets</th>
                    <th>{price(selectedRow.totalassetmostrecentfiscalyear)}</th>
                    <th>{price(selectedRow.totalassetpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Cash</th>
                    <th>{price(selectedRow.cashequimostrecentfiscalyear)}</th>
                    <th>{price(selectedRow.cashequipriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Accts Receivable</th>
                    <th>{price(selectedRow.actreceivedrecentfiscalyear)}</th>
                    <th>{price(selectedRow.actreceivedpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Short-Term Debt</th>
                    <th>{price(selectedRow.shorttermdebtmrecentfiscalyear)}</th>
                    <th>{price(selectedRow.shorttermdebtpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Long-Term Debt</th>
                    <th>{price(selectedRow.longtermdebtrecentfiscalyear)}</th>
                    <th>{price(selectedRow.longtermdebtpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Revenue</th>
                    <th>{price(selectedRow.revenuemostrecentfiscalyear)}</th>
                    <th>{price(selectedRow.revenuepriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>COGS</th>
                    <th>{price(selectedRow.costgoodssoldrecentfiscalyear)}</th>
                    <th>{price(selectedRow.costgoodssoldpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Tax Paid</th>
                    <th>{price(selectedRow.taxpaidmostrecentfiscalyear)}</th>
                    <th>{price(selectedRow.taxpaidpriorfiscalyear)}</th>
                  </tr>
                  <tr>
                    <th>Net Income</th>
                    <th>{price(selectedRow.netincomemostrecentfiscalyear)}</th>
                    <th>{price(selectedRow.netincomepriorfiscalyear)}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
