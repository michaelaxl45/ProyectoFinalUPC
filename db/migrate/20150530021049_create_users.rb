class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :password
      t.string :email
      t.integer :phone

      t.timestamps
    end
  end
end
