class UploadSerializer < CacheCrispies::Base
  do_caching true
  serialize :id, :name, :created_at, :full_url, :thumbnail_url, :full_image
end
