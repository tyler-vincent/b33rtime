json.array! @uploads do |upload|
  json.extract! upload, :id, :name, :created_at, :full_url
  json.thumbnail_url upload.image_url(:thumb)
  json.full_image upload.image_url(:full)
end
