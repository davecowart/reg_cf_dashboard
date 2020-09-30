class AddDisclosures < ActiveRecord::Migration[6.0]
  def change
    create_table :disclosures do |t|
      t.string :accession_number
      t.string :accession_number_sub
      t.string :compensationamount, null: true
      t.string :financialinterest, null: true
      t.string :securityofferedtype, null: true
      t.string :securityofferedotherdesc, null: true
      t.integer :noofsecurityoffered, null: true
      t.float :price, null: true
      t.string :pricedeterminationmethod, null: true
      t.float :offeringamount, null: true
      t.boolean :oversubscriptionaccepted, null: true
      t.string :oversubscriptionallocationtype, null: true
      t.string :descoversubscription, null: true
      t.float :maximumofferingamount, null: true
      t.date :deadlinedate, null: true
      t.integer :currentemployees, null: true
      t.float :totalassetmostrecentfiscalyear, null: true
      t.float :totalassetpriorfiscalyear, null: true
      t.float :cashequimostrecentfiscalyear, null: true
      t.float :cashequipriorfiscalyear, null: true
      t.float :actreceivedrecentfiscalyear, null: true
      t.float :actreceivedpriorfiscalyear, null: true
      t.float :shorttermdebtmrecentfiscalyear, null: true
      t.float :shorttermdebtpriorfiscalyear, null: true
      t.float :longtermdebtrecentfiscalyear, null: true
      t.float :longtermdebtpriorfiscalyear, null: true
      t.float :revenuemostrecentfiscalyear, null: true
      t.float :revenuepriorfiscalyear, null: true
      t.float :costgoodssoldrecentfiscalyear, null: true
      t.float :costgoodssoldpriorfiscalyear, null: true
      t.float :taxpaidmostrecentfiscalyear, null: true
      t.float :taxpaidpriorfiscalyear, null: true
      t.float :netincomemostrecentfiscalyear, null: true
      t.float :netincomepriorfiscalyear, null: true
      t.integer :year
      t.integer :quarter
    end
  end
end
