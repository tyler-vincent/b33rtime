class AddMd5NameToUploads < ActiveRecord::Migration[4.2]
  def up
    add_column :uploads, :md5_name, :string

    Upload.all.each do |u|
      u.update_attribute("md5_name", u.to_md5)
    end

  end
end
