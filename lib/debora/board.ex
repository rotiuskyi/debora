defmodule Debora.Board do
  use Ecto.Schema

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "boards" do
    field :name, :string
  end
end
