class Disclosure < ApplicationRecord
  has_one :issuer, foreign_key: 'accession_number', primary_key: 'accession_number'
end
