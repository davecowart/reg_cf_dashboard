Rails.application.routes.draw do
  namespace :api do
    get 'disclosures/index'
    get 'disclosures/stats'
  end
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
