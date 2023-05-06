defmodule Debora.Repo.Migrations.CreateDevices do
  use Ecto.Migration

  def change do
    create table(:devices) do
      add :name, :string, null: false
      add :board_id, references(:boards), null: false
      add :notes, :text, default: ""
    end
  end
end
