class Api::DisclosuresController < ApplicationController
  def index
    render json: Disclosure.all
  end
end
