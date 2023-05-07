defmodule Debora.Device do
  use Ecto.Schema

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "devices" do
    field :title, :string
    belongs_to :board, Debora.Board
  end
end
