defmodule Debora.Repo.Migrations.CreateUserBoards do
  use Ecto.Migration

  def change do
    create table(:account_boards) do
      add :account_subject, references(:accounts, type: :string, column: :subject), null: false
      add :board_id, references(:boards), null: false
    end
  end
end
