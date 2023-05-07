defmodule DeboraWeb.BoardController do
  use Phoenix.Controller

  import Ecto.Query
  import Plug.Conn

  alias Debora.Account
  alias Debora.AccountBoard
  alias Debora.Board
  alias Debora.Repo

  def all(conn, _) do
    subject = conn.assigns.auth_subject

    boards =
      from(b in Board,
        join: ab in AccountBoard,
        on: b.id == ab.board_id,
        join: a in Account,
        on: ab.account_subject == a.subject,
        where: a.subject == ^subject,
        preload: [:devices]
      )
      |> Repo.all()
      |> Jason.encode!()

    send_resp(conn, 200, boards)
  end

  def create(conn, params) do
    subject = conn.assigns.auth_subject
    %{"title" => title} = params

    {:ok, board} =
      Repo.transaction(fn ->
        board =
          Repo.preload(%Board{title: title}, [:devices])
          |> Repo.insert!()

        %Board{id: board_id} = board
        Repo.insert!(%AccountBoard{account_subject: subject, board_id: board_id})

        Jason.encode!(board)
      end)

    send_resp(conn, 201, board)
  end
end
