defmodule Debora.Board do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "boards" do
    field :title, :string
    has_many :devices, Debora.Device
  end

  def changeset(struct, params) do
    struct
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
