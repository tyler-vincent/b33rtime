class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :fog

  def store_dir
    "#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  version :full do
    process :rotate_and_strip_exif
  end

  version :thumb, :from_version => :full do
    process :remove_animation
    process :resize_to_fill => [300, 300]
    process :convert => 'jpg'
  end

  def remove_animation
    p "IMAGE TYPE"

    manipulate! do |img|
      p img.mime_type
      if img.mime_type.match /gif/
        img.collapse!
      end
      img
    end
  end

  def rotate_and_strip_exif
    manipulate! do |img|
      unless img.mime_type.match /gif/
        img.auto_orient
        img.strip
      end
      img
    end
  end

end
