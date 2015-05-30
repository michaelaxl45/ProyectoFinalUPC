class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.integer :restaurant_id
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end
