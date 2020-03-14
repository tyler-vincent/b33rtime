class AddTokenToUploads < ActiveRecord::Migration[4.2]
  def change
    add_column :uploads, :token, :string
    add_index :uploads, :token

    Upload.all.each do |u|
      new_token = loop do
        random_token = SecureRandom.hex(3)
        break random_token unless Upload.exists?(token: random_token)
      end
      u.update_columns(:token => new_token)
    end

  end
end
