defmodule Debora.AccountBoard do
  use Ecto.Schema

  @derive {Jason.Encoder, only: []}
  schema "account_boards" do
    belongs_to :account, Debora.Account,
      type: :string,
      foreign_key: :account_subject,
      references: :subject

    belongs_to :board, Debora.Board
  end
end
