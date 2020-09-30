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
    t.string "accession_number"
    t.string "accession_number_sub"
    t.string "compensationamount"
    t.string "financialinterest"
    t.string "securityofferedtype"
    t.string "securityofferedotherdesc"
    t.integer "noofsecurityoffered"
    t.float "price"
    t.string "pricedeterminationmethod"
    t.float "offeringamount"
    t.boolean "oversubscriptionaccepted"
    t.string "oversubscriptionallocationtype"
    t.string "descoversubscription"
    t.float "maximumofferingamount"
    t.date "deadlinedate"
    t.integer "currentemployees"
    t.float "totalassetmostrecentfiscalyear"
    t.float "totalassetpriorfiscalyear"
    t.float "cashequimostrecentfiscalyear"
    t.float "cashequipriorfiscalyear"
    t.float "actreceivedrecentfiscalyear"
    t.float "actreceivedpriorfiscalyear"
    t.float "shorttermdebtmrecentfiscalyear"
    t.float "shorttermdebtpriorfiscalyear"
    t.float "longtermdebtrecentfiscalyear"
    t.float "longtermdebtpriorfiscalyear"
    t.float "revenuemostrecentfiscalyear"
    t.float "revenuepriorfiscalyear"
    t.float "costgoodssoldrecentfiscalyear"
    t.float "costgoodssoldpriorfiscalyear"
    t.float "taxpaidmostrecentfiscalyear"
    t.float "taxpaidpriorfiscalyear"
    t.float "netincomemostrecentfiscalyear"
    t.float "netincomepriorfiscalyear"
    t.integer "year"
    t.integer "quarter"
  end

  create_table "imports", force: :cascade do |t|
    t.integer "year"
    t.integer "quarter"
  end

  create_table "issuers", force: :cascade do |t|
    t.string "accession_number"
    t.boolean "isamendment"
    t.string "progressupdate"
    t.string "natureofamendment"
    t.string "nameofissuer"
    t.string "legalstatusform"
    t.string "legalstatusotherdesc"
    t.string "jurisdictionorganization"
    t.string "dateincorporation"
    t.string "street1"
    t.string "street2"
    t.string "city"
    t.string "stateorcountry"
    t.string "zipcode"
    t.string "issuerwebsite"
    t.string "companyname"
    t.string "commissioncik"
    t.string "commissionfilenumber"
    t.string "crdnumber"
  end

end
