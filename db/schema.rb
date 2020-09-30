# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_30_174858) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "disclosures", force: :cascade do |t|
    t.string "ACCESSION_NUMBER"
    t.string "COMPENSATIONAMOUNT"
    t.string "FINANCIALINTEREST"
    t.string "SECURITYOFFEREDTYPE"
    t.string "SECURITYOFFEREDOTHERDESC"
    t.integer "NOOFSECURITYOFFERED"
    t.float "PRICE"
    t.string "PRICEDETERMINATIONMETHOD"
    t.float "OFFERINGAMOUNT"
    t.boolean "OVERSUBSCRIPTIONACCEPTED"
    t.string "OVERSUBSCRIPTIONALLOCATIONTYPE"
    t.string "DESCOVERSUBSCRIPTION"
    t.float "MAXIMUMOFFERINGAMOUNT"
    t.date "DEADLINEDATE"
    t.integer "CURRENTEMPLOYEES"
    t.float "TOTALASSETMOSTRECENTFISCALYEAR"
    t.float "TOTALASSETPRIORFISCALYEAR"
    t.float "CASHEQUIMOSTRECENTFISCALYEAR"
    t.float "CASHEQUIPRIORFISCALYEAR"
    t.float "ACTRECEIVEDRECENTFISCALYEAR"
    t.float "ACTRECEIVEDPRIORFISCALYEAR"
    t.float "SHORTTERMDEBTMRECENTFISCALYEAR"
    t.float "SHORTTERMDEBTPRIORFISCALYEAR"
    t.float "LONGTERMDEBTRECENTFISCALYEAR"
    t.float "LONGTERMDEBTPRIORFISCALYEAR"
    t.float "REVENUEMOSTRECENTFISCALYEAR"
    t.float "REVENUEPRIORFISCALYEAR"
    t.float "COSTGOODSSOLDRECENTFISCALYEAR"
    t.float "COSTGOODSSOLDPRIORFISCALYEAR"
    t.float "TAXPAIDMOSTRECENTFISCALYEAR"
    t.float "TAXPAIDPRIORFISCALYEAR"
    t.float "NETINCOMEMOSTRECENTFISCALYEAR"
    t.float "NETINCOMEPRIORFISCALYEAR"
    t.integer "year"
    t.integer "quarter"
  end

  create_table "imports", force: :cascade do |t|
    t.integer "year"
    t.integer "quarter"
  end

  create_table "issuers", force: :cascade do |t|
    t.string "ACCESSION_NUMBER"
    t.boolean "ISAMENDMENT"
    t.string "PROGRESSUPDATE"
    t.string "NATUREOFAMENDMENT"
    t.string "NAMEOFISSUER"
    t.string "LEGALSTATUSFORM"
    t.string "LEGALSTATUSOTHERDESC"
    t.string "JURISDICTIONORGANIZATION"
    t.string "DATEINCORPORATION"
    t.string "STREET1"
    t.string "STREET2"
    t.string "CITY"
    t.string "STATEORCOUNTRY"
    t.string "ZIPCODE"
    t.string "ISSUERWEBSITE"
    t.string "COMPANYNAME"
    t.string "COMMISSIONCIK"
    t.string "COMMISSIONFILENUMBER"
    t.string "CRDNUMBER"
  end

end
