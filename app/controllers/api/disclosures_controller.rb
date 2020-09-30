class Api::DisclosuresController < ApplicationController
  def index
    limit = params[:pageSize].to_i || 50
    limit = 50 if limit == 0
    offset = limit * (params[:pageIndex].to_i || 0)
    key = params[:orderBy] || 'accession_number'
    direction = params[:orderDirection] == 'DESC' ? 'DESC' : 'ASC'

    order = "#{key} #{direction}"
    puts "limit #{limit}"
    puts "offset #{offset}"
    puts "key #{key}"
    puts "direction #{direction}"
    puts "order #{order}"
    render json: Disclosure.includes(:issuer).order(order).offset(offset).limit(limit).to_json(include: :issuer)
  end
end
