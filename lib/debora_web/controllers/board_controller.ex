defmodule DeboraWeb.BoardController do
  use Phoenix.Controller

  import Ecto.Query

  alias Debora.Account
  alias Debora.AccountBoard
  alias Debora.Board
  alias Debora.Repo

  def show(conn, _opts) do
    %{"iss" => iss, "email" => email} = conn.assigns.auth_context

    boards =
      from(b in Board,
        join: ab in AccountBoard,
        on: b.id == ab.account_id,
        join: a in Account,
        on: ab.account_id == a.id,
        where: a.issuer == ^iss and a.user_email == ^email
      )
      |> Repo.all()
      |> Jason.encode!()

    Plug.Conn.send_resp(conn, 200, boards)
  end
end
