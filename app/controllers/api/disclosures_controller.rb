class Api::DisclosuresController < ApplicationController
  def index
    render json: Disclosure.includes(:issuer).all
  end
end
