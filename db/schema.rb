# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_07_163550) do
  create_table "uploads", id: :integer, charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", precision: nil
    t.datetime "updated_at", precision: nil
    t.string "md5_name"
    t.string "token"
    t.index ["token"], name: "index_uploads_on_token"
  end

end
