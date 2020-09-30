require "csv"
require "open-uri"
require "zip"

namespace :data do
  desc "Imports Regulation CF disclosures from the SEC"
  task import: :environment do

    # get latest import
    latest_import = Import.order(year: :desc).order(quarter: :desc).limit(1)
    newest_data = latest_import.length == 0 ? { year: 2016, quarter: 1 } : latest_import[0]
    next_data = newest_data[:quarter] == 4 ? { year: newest_data[:year] + 1, quarter: 1 } : { year: newest_data[:year], quarter: newest_data[:quarter] + 1 }

    downcase_converter = lambda { |header| header.downcase }

    while true do
      begin
        puts "Looking for #{next_data}"
        zip_file = URI.open("https://www.sec.gov/files/dera/data/crowdfunding-offerings-data-sets/#{next_data[:year]}q#{next_data[:quarter]}_cf.zip")

        Zip::File.open_buffer(zip_file) do |zip|
          zip.each do |entry|
            if entry.name.end_with?("FORM_C_DISCLOSURE.tsv") then
              puts "Extracting #{entry.name}"

              #read contents
              content = entry.get_input_stream.read

              # parse TSV
              parsed = CSV.parse(content, col_sep: "\t", headers: true, header_converters: downcase_converter)

              # store in database
              Disclosure.insert_all(parsed.map{|p| p.to_hash.merge(next_data).merge({accession_number_sub: p['accession_number'].split("-")[0]})})
              Import.insert(next_data)
            elsif entry.name.end_with?("FORM_C_ISSUER_INFORMATION.tsv")
              puts "Extracting #{entry.name}"

              #read contents
              content = entry.get_input_stream.read

              # parse TSV
              parsed = CSV.parse(content, col_sep: "\t", headers: true, header_converters: downcase_converter)

              # store in database
              Issuer.insert_all(parsed.map{|p| p.to_hash})
              Import.insert(next_data)
            end
          end
        end

        next_data = next_data[:quarter] == 4 ? { year: next_data[:year] + 1, quarter: 1 } : { year: next_data[:year], quarter: next_data[:quarter] + 1 }
      rescue => e
        puts e
        # break loop if newer file doesn't exist
        puts 'Newer file not found'
        break
      end

    end

  end
end
