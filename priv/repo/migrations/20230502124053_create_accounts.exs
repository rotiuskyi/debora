defmodule Debora.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts, primary_key: false) do
      add :subject, :string, null: false, primary_key: true
      add :issuer, :string, null: false
      add :user_name, :string, null: true
      add :user_email, :string, null: false
      add :picture, :string, null: true
    end
  end
end
