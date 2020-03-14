CarrierWave.configure do |config|
  config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => Rails.application.credentials.aws[:key],
      :aws_secret_access_key  => Rails.application.credentials.aws[:secret]
  }
  config.fog_directory  = Rails.application.credentials.aws[:directory]
  config.fog_public     = false
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}
  config.fog_authenticated_url_expiration = 600
end
