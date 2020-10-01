import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import { XYPlot, ChartLabel, DiscreteColorLegend, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import USAMap from "react-usa-map";

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
                      <td className="text-nowrap" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="d-flex justify-content-around">
        <button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous Page</button>
        <span>Page {pageIndex + 1} of {pageOptions.length}</span>
        <button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
      </div>

    </>
  )
};

const ActionLink = ({action, children, ...rest}) => (
  <a {...rest} href="#" onClick={e => {
      e.preventDefault();
      if (action) action(e);
    }}>{children}</a>
);

const Graph = ({title, series, selectedRow}) => {
  const lineData = (selectedRow, fields) => {
    if (!selectedRow[fields[0]] && !selectedRow[fields[1]]) return null;
    return [
      { x: 1, y: selectedRow[fields[0]] || 0, title: fields[0] },
      { x: 2, y: selectedRow[fields[1]] || 0, title: fields[1] },
    ];
  };

  const showGraph = (selectedRow, series) => {
    return series.some(s => selectedRow[s.fields[0]] && selectedRow[s.fields[1]])
  };

  return (
    <div style={{marginBottom: 100}}>
      <h4>{title}</h4>
      {
        showGraph(selectedRow, series) &&
        <XYPlot height={300} width={400} margin={{left: 100, right: 25}}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis
            style={{
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, fontSize: 12}
            }}
            tickTotal={2}
            tickValues={[1,2]}
            tickLabelAngle={0}
            tickFormat={value => value === 1 ? selectedRow.year - 2 : selectedRow.year - 1}
            />
          <YAxis
            style={{
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600, fontSize: 12}
            }}
            tickFormat={value => price(value)} />
          {
            series.map(s => (
              <LineSeries key={s.title} data={lineData(selectedRow, s.fields)} color={s.color} strokeWidth={5} style={{
                strokeDasharray: '7 3'
              }} />
            ))
          }
          <DiscreteColorLegend orientation="horizontal" items={series.map(s => ({
              title: s.title,
              color: s.color,
              strokeWidth: 10,
              strokeDasharray: '7 3'
            }))} />
        </XYPlot>
      }
      {
        !showGraph(selectedRow, series) &&
        <p>No data available</p>
      }
    </div>
  );
};

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState();
  const fetchIdRef = useRef(0);
  const [currentTab, setCurrentTab] = useState('overview');
  const [states, setStates] = useState({});

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

  const fetchStats = useCallback(async () => {
    const { data: { states } } = await axios.get(`/api/disclosures/stats`);
    const statesMap = {};
    let maxValue = 0;
    for (const key of Object.keys(states)) {
      if (Math.sqrt(states[key]) > maxValue) maxValue = Math.sqrt(states[key]);
    }
    for (const key of Object.keys(states)) {
      if (!key) continue;
      statesMap[key] = {
        fill: '#0000FF' + Math.floor((Math.sqrt(states[key]) / maxValue) * 255).toString(16).toUpperCase().padStart(2, '0')
      };
    }
    console.log('statesMap', statesMap);
    setStates(statesMap);
  }, []);

  useEffect(() => {
    console.log('getting stats')
    fetchStats();
  }, []);

  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'issuer.nameofissuer' },
    { Header: 'Employees', accessor: 'currentemployees' },
    { Header: 'Quarter', accessor: (row, i) => `${row.year}Q${row.quarter}`, id: 'quarter' },
    { Header: 'State', accessor: 'issuer.stateorcountry' }
  ], []);

  return (
    <div className="container mw-100">
      <div className="row">
        <div className="col-7">
          <h1>RegCF Dashboard</h1>
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
        <div className="col-5 overflow-auto vh-100 pt-5">
          {
            selectedRow &&
            <div>
              <div className="d-flex justify-content-between">
                <h2>{selectedRow.issuer.nameofissuer}</h2>
                <button className="btn btn-secondary" onClick={() => setSelectedRow(null)}>X</button>
              </div>
              <ul className="nav nav-tabs my-3">
                <li className="nav-item">
                  <ActionLink className={'nav-link' + (currentTab === 'overview' ? ' active' : '')} action={() => setCurrentTab('overview')}>Overview</ActionLink>
                </li>
                <li className="nav-item">
                  <ActionLink className={'nav-link' + (currentTab === 'financials' ? ' active' : '')} action={() => setCurrentTab('financials')}>Financials</ActionLink>
                </li>
                <li className="nav-item">
                  <ActionLink className={'nav-link' + (currentTab === 'graphs' ? ' active' : '')} action={() => setCurrentTab('graphs')}>Graphs</ActionLink>
                </li>
              </ul>

              {
                currentTab ==='overview' &&
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
                      {selectedRow.issuer.city}, {selectedRow.issuer.stateorcountry} {selectedRow.issuer.zipcode}
                    </address>
                  </li>
                  <li className="list-group-item">
                    Current Employees: {selectedRow.currentemployees || 'Unknown'}
                  </li>
                  <li className="list-group-item">
                    Date of Incorporation: {selectedRow.issuer.dateincorporation || 'Unknown'}
                  </li>
                  <li className="list-group-item">
                    Funding Deadline: {selectedRow.deadlinedate || 'Unknown'}
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
              }
              {
                currentTab === 'financials' &&
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Prior FY ({selectedRow.year - 2})</th>
                      <th>Most Recent FY ({selectedRow.year - 1})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Total Assets</th>
                      <th>{price(selectedRow.totalassetpriorfiscalyear)}</th>
                      <th>{price(selectedRow.totalassetmostrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Cash</th>
                      <th>{price(selectedRow.cashequipriorfiscalyear)}</th>
                      <th>{price(selectedRow.cashequimostrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Accts Receivable</th>
                      <th>{price(selectedRow.actreceivedpriorfiscalyear)}</th>
                      <th>{price(selectedRow.actreceivedrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Short-Term Debt</th>
                      <th>{price(selectedRow.shorttermdebtpriorfiscalyear)}</th>
                      <th>{price(selectedRow.shorttermdebtmrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Long-Term Debt</th>
                      <th>{price(selectedRow.longtermdebtpriorfiscalyear)}</th>
                      <th>{price(selectedRow.longtermdebtrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Revenue</th>
                      <th>{price(selectedRow.revenuepriorfiscalyear)}</th>
                      <th>{price(selectedRow.revenuemostrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>COGS</th>
                      <th>{price(selectedRow.costgoodssoldpriorfiscalyear)}</th>
                      <th>{price(selectedRow.costgoodssoldrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Tax Paid</th>
                      <th>{price(selectedRow.taxpaidpriorfiscalyear)}</th>
                      <th>{price(selectedRow.taxpaidmostrecentfiscalyear)}</th>
                    </tr>
                    <tr>
                      <th>Net Income</th>
                      <th>{price(selectedRow.netincomepriorfiscalyear)}</th>
                      <th>{price(selectedRow.netincomemostrecentfiscalyear)}</th>
                    </tr>
                  </tbody>
                </table>
              }
              {
                currentTab === 'graphs' &&
                <div>
                  <Graph
                    title="Debt"
                    selectedRow={selectedRow}
                    series={[
                      { title: 'Long Term Debt', color: 'red', fields: ['longtermdebtpriorfiscalyear', 'longtermdebtrecentfiscalyear'] },
                      { title: 'Short Term Debt', color: 'orange', fields: ['shorttermdebtpriorfiscalyear', 'shorttermdebtmrecentfiscalyear'] }
                    ]}/>
                  <hr />
                  <Graph
                    title="Assets"
                    selectedRow={selectedRow}
                    series={[
                      { title: 'Total Assets', color: 'blue', fields: ['totalassetpriorfiscalyear', 'totalassetmostrecentfiscalyear'] },
                      { title: 'Cash', color: 'green', fields: ['cashequipriorfiscalyear', 'cashequimostrecentfiscalyear'] },
                      { title: 'Accounts Receivable', color: 'orange', fields: ['actreceivedpriorfiscalyear', 'actreceivedrecentfiscalyear'] }
                    ]}/>
                  <hr />
                  <Graph
                    title="Income"
                    selectedRow={selectedRow}
                    series={[
                      { title: 'Revenue', color: 'green', fields: ['revenuepriorfiscalyear', 'revenuemostrecentfiscalyear'] },
                      { title: 'Cost of Goods Sold', color: 'orange', fields: ['costgoodssoldpriorfiscalyear', 'costgoodssoldrecentfiscalyear'] },
                      { title: 'Taxes Paid', color: 'red', fields: ['taxpaidpriorfiscalyear', 'taxpaidmostrecentfiscalyear'] },
                      { title: 'Net Income', color: 'blue', fields: ['netincomepriorfiscalyear', 'netincomemostrecentfiscalyear'] }
                    ]}/>
                </div>
              }
            </div>
          }
          {
            !selectedRow &&
            <>
              <h3>Disclosures per State</h3>
              <USAMap width={400} height={300} customize={states} defaultFill="#0000FF00" title="Disclosures per state" />
            </>
          }
        </div>
      </div>
    </div>
  );
};
