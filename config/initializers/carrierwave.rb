CarrierWave.configure do |config|
  config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => Rails.application.credentials.dig(:aws, :key),
      :aws_secret_access_key  => Rails.application.credentials.dig(:aws, :secret),
      :path_style => true
  }

  config.asset_host = 'https://full.b33rti.me'
  config.fog_directory  = Rails.application.credentials.dig(:aws, :directory)
  config.fog_public     = true
end
