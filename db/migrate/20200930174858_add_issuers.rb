class AddIssuers < ActiveRecord::Migration[6.0]
  def change
    create_table :issuers do |t|
      t.string :accession_number
      t.boolean :isamendment, null: true
      t.string :progressupdate, null: true
      t.string :natureofamendment, null: true
      t.string :nameofissuer
      t.string :legalstatusform, null: true
      t.string :legalstatusotherdesc, null: true
      t.string :jurisdictionorganization, null: true
      t.string :dateincorporation, null: true
      t.string :street1, null: true
      t.string :street2, null: true
      t.string :city, null: true
      t.string :stateorcountry, null: true
      t.string :zipcode, null: true
      t.string :issuerwebsite, null: true
      t.string :companyname, null: true
      t.string :commissioncik, null: true
      t.string :commissionfilenumber, null: true
      t.string :crdnumber, null: true
    end
  end
end
