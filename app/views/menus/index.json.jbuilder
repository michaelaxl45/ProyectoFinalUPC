json.array!(@menus) do |menu|
  json.extract! menu, :id, :menu_id, :dish_id, :total, :price, :restaurant_id
  json.url menu_url(menu, format: :json)
end
