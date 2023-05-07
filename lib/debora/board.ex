defmodule Debora.Board do
  use Ecto.Schema

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "boards" do
    field :title, :string
    has_many :devices, Debora.Device
  end
end
