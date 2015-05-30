json.array!(@orders) do |order|
  json.extract! order, :id, :order_id, :menu_id, :price
  json.url order_url(order, format: :json)
end
