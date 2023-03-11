class UploadSerializer < CacheCrispies::Base
  serialize :id, :name, :created_at, :full_url, :thumbnail_url, :full_image
end
