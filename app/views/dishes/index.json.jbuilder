json.array!(@dishes) do |dish|
  json.extract! dish, :id, :dish_id, :name, :price, :category_id
  json.url dish_url(dish, format: :json)
end
