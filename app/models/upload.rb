require 'file_size_validator'
require 'digest/md5'

class Upload < ActiveRecord::Base
  mount_uploader :image, ImageUploader

  before_create :default_name
  before_create :generate_token

  validates :image,
            :presence => true,
            :file_size => {
              :maximum => 32.megabytes.to_i
            }

  validates :token, :uniqueness => true

  def default_name
    self.name ||= File.basename(image.filename, '.*').titleize if image
  end

  def self.recreate_versions
    Upload.where("1=1").find_in_batches(:start => 2, :batch_size => 2) do |u|
      u.each{|i| i.image.recreate_versions!}
    end
  end

  def full_url
    return "http://m.#{Rails.application.config.http_domain}/#{token}.#{image.file.try(:extension).try(:downcase)}"
  end

  def thumbnail_url
    return self.image_url(:thumb)
  end

  def full_image
    return self.image_url(:full)
  end

  protected

  def generate_token
    self.token = SecureRandom.hex(3)
    generate_token if Upload.exists?(token: self.token)
  end

end
