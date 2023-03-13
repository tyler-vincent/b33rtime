CacheCrispies.configure do |conf|
  conf.cache_key_method = :cache_key_with_version
  p "CACHE UP"
end
