Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :lists do
        resources :list_items, shallow: true
      end
    end
  end

  root 'pages#index' # default to list index
end
