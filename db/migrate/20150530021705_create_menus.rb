class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :menu_id
      t.integer :dish_id
      t.integer :total
      t.decimal :price
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
