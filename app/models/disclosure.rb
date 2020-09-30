class Disclosure < ApplicationRecord
  has_one :issuer, foreign_key: 'ACCESSION_NUMBER', primary_key: 'ACCESSION_NUMBER'
end
