defmodule Debora.Repo do
  use Ecto.Repo,
    otp_app: :debora,
    adapter: Ecto.Adapters.Postgres
end
