json.array!(@users) do |user|
  json.extract! user, :id, :user_id, :password, :email, :phone
  json.url user_url(user, format: :json)
end
