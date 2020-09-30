class AddIssuers < ActiveRecord::Migration[6.0]
  def change
    create_table :issuers do |t|
      t.string :ACCESSION_NUMBER
      t.boolean :ISAMENDMENT, null: true
      t.string :PROGRESSUPDATE, null: true
      t.string :NATUREOFAMENDMENT, null: true
      t.string :NAMEOFISSUER
      t.string :LEGALSTATUSFORM, null: true
      t.string :LEGALSTATUSOTHERDESC, null: true
      t.string :JURISDICTIONORGANIZATION, null: true
      t.string :DATEINCORPORATION, null: true
      t.string :STREET1, null: true
      t.string :STREET2, null: true
      t.string :CITY, null: true
      t.string :STATEORCOUNTRY, null: true
      t.string :ZIPCODE, null: true
      t.string :ISSUERWEBSITE, null: true
      t.string :COMPANYNAME, null: true
      t.string :COMMISSIONCIK, null: true
      t.string :COMMISSIONFILENUMBER, null: true
      t.string :CRDNUMBER, null: true
    end
  end
end
