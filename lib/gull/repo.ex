defmodule Gull.Repo do
  use Ecto.Repo,
    otp_app: :gull,
    adapter: Ecto.Adapters.Postgres
end
