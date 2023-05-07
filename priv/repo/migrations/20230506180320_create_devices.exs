defmodule Debora.Repo.Migrations.CreateDevices do
  use Ecto.Migration

  def change do
    create table(:devices) do
      add :title, :string, null: false
      add :board_id, references(:boards), null: false
    end
  end
end
