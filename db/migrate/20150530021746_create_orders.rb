class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :order_id
      t.string :menu_id
      t.decimal :price

      t.timestamps
    end
  end
end
