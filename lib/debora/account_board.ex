defmodule Debora.AccountBoard do
  use Ecto.Schema

  schema "account_boards" do
    belongs_to :account, Debora.Account
    belongs_to :board, Debora.Board
  end
end
