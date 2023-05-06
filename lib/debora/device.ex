defmodule Debora.Device do
  use Ecto.Schema

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "devices" do
    field :name, :string
    field :notes, :string
    belongs_to :board, Debora.Board
  end
end
