class CreateUploads < ActiveRecord::Migration[4.2]
  def change
    create_table :uploads do |t|
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
