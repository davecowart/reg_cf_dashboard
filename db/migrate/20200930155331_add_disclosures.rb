class AddDisclosures < ActiveRecord::Migration[6.0]
  def change
    create_table :disclosures do |t|
      t.string :ACCESSION_NUMBER
      t.string :COMPENSATIONAMOUNT, null: true
      t.string :FINANCIALINTEREST, null: true
      t.string :SECURITYOFFEREDTYPE, null: true
      t.string :SECURITYOFFEREDOTHERDESC, null: true
      t.integer :NOOFSECURITYOFFERED, null: true
      t.float :PRICE, null: true
      t.string :PRICEDETERMINATIONMETHOD, null: true
      t.float :OFFERINGAMOUNT, null: true
      t.boolean :OVERSUBSCRIPTIONACCEPTED, null: true
      t.string :OVERSUBSCRIPTIONALLOCATIONTYPE, null: true
      t.string :DESCOVERSUBSCRIPTION, null: true
      t.float :MAXIMUMOFFERINGAMOUNT, null: true
      t.date :DEADLINEDATE, null: true
      t.integer :CURRENTEMPLOYEES, null: true
      t.float :TOTALASSETMOSTRECENTFISCALYEAR, null: true
      t.float :TOTALASSETPRIORFISCALYEAR, null: true
      t.float :CASHEQUIMOSTRECENTFISCALYEAR, null: true
      t.float :CASHEQUIPRIORFISCALYEAR, null: true
      t.float :ACTRECEIVEDRECENTFISCALYEAR, null: true
      t.float :ACTRECEIVEDPRIORFISCALYEAR, null: true
      t.float :SHORTTERMDEBTMRECENTFISCALYEAR, null: true
      t.float :SHORTTERMDEBTPRIORFISCALYEAR, null: true
      t.float :LONGTERMDEBTRECENTFISCALYEAR, null: true
      t.float :LONGTERMDEBTPRIORFISCALYEAR, null: true
      t.float :REVENUEMOSTRECENTFISCALYEAR, null: true
      t.float :REVENUEPRIORFISCALYEAR, null: true
      t.float :COSTGOODSSOLDRECENTFISCALYEAR, null: true
      t.float :COSTGOODSSOLDPRIORFISCALYEAR, null: true
      t.float :TAXPAIDMOSTRECENTFISCALYEAR, null: true
      t.float :TAXPAIDPRIORFISCALYEAR, null: true
      t.float :NETINCOMEMOSTRECENTFISCALYEAR, null: true
      t.float :NETINCOMEPRIORFISCALYEAR, null: true
      t.integer :year
      t.integer :quarter
    end
  end
end
