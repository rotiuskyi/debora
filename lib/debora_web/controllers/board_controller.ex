defmodule DeboraWeb.BoardController do
  use Phoenix.Controller

  import Ecto.Query

  alias Debora.Account
  alias Debora.AccountBoard
  alias Debora.Board
  alias Debora.Repo

  def all(conn, _opts) do
    %{"iss" => iss, "email" => email} = conn.assigns.auth_context

    boards =
      from(b in Board,
        join: ab in AccountBoard,
        on: b.id == ab.board_id,
        join: a in Account,
        on: ab.account_id == a.id,
        where: a.issuer == ^iss and a.user_email == ^email
      )
      |> Repo.all()
      |> Jason.encode!()

    Plug.Conn.send_resp(conn, 200, boards)
  end

  def create(conn, params) do
    %{"iss" => iss, "email" => email} = conn.assigns.auth_context
    %{"name" => name} = params

    {:ok, board} =
      Repo.transaction(fn ->
        %Account{id: account_id} = Repo.get_by!(Account, issuer: iss, user_email: email)
        board = Repo.insert!(%Board{name: name})
        %Board{id: board_id} = board
        Repo.insert!(%AccountBoard{account_id: account_id, board_id: board_id})
        board
      end)

    Plug.Conn.send_resp(conn, 201, board |> Jason.encode!())
  end
end
