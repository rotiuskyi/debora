defmodule Debora.Account do
  use Ecto.Schema

  @derive {Jason.Encoder, except: [:__meta__, :boards]}
  schema "accounts" do
    field :issuer, :string
    field :user_name, :string
    field :user_email, :string
    field :picture, :string
    has_many :boards, Debora.AccountBoard
  end
end
