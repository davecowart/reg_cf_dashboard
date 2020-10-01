class Api::DisclosuresController < ApplicationController
  def index
    limit = params[:pageSize].to_i || 50
    limit = 50 if limit == 0
    offset = limit * (params[:pageIndex].to_i || 0)
    key = params[:orderBy] || 'accession_number'
    direction = params[:orderDirection] == 'ASC' ? 'ASC' : 'DESC'

    order = "#{key} #{direction}"
    
    latest_ids = Disclosure.group(:accession_number_sub).maximum(:id).values
    output = {
      disclosures: Disclosure.includes(:issuer).where(id: latest_ids).order(order).offset(offset).limit(limit).to_json(include: :issuer),
      pages: latest_ids.count / limit
    }
    render json: output
  end

  def stats
    latest_ids = Disclosure.group(:accession_number_sub).maximum(:id).values
    accession_numbers = Disclosure.includes(:issuer).where(id: latest_ids).map{|d| d.accession_number}
    states = Issuer.where(accession_number: accession_numbers).group(:stateorcountry).count
    output = {
      states: states
    }
    render json: output
  end
end
