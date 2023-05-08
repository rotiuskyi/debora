defmodule Debora.Device do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "devices" do
    field :title, :string
    belongs_to :board, Debora.Board
  end

  def chancheset_to_create(struct, params) do
    struct
    |> cast(params, [:title, :board_id])
    |> validate_required([:title, :board_id])
  end

  def changeset_to_update(struct, params) do
    struct
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
