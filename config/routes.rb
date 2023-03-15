Rails.application.routes.draw do
  resources :uploads do
    collection do
      get :more
    end
  end
  constraints :subdomain => "i" do
    get '/:id' => 'uploads#stream_image'
  end

  constraints :subdomain => "m" do
    get '/:token' => 'uploads#stream_image'
  end

  get '/i/:token' => 'uploads#stream_image'
  root to: 'home#index'
end
