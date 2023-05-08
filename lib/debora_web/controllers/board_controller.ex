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

  def one(conn, params) do
    subject = conn.assigns.auth_subject
    %{"id" => id} = params
    board_id = String.to_integer(id)

    board =
      from(b in Board,
        join: ab in AccountBoard,
        on: b.id == ab.board_id,
        join: a in Account,
        on: ab.account_subject == a.subject,
        where: b.id == ^board_id and ab.account_subject == ^subject,
        preload: [:devices]
      )
      |> Repo.one!()
      |> Jason.encode!()

    send_resp(conn, 200, board)
  end

  def create(conn, params) do
    subject = conn.assigns.auth_subject

    {:ok, board} =
      Repo.transaction(fn ->
        board = Board.changeset(%Board{devices: []}, params) |> Repo.insert!()
        %Board{id: board_id} = board
        Repo.insert!(%AccountBoard{account_subject: subject, board_id: board_id})

        Jason.encode!(board)
      end)

    send_resp(conn, 201, board)
  end

  def update(conn, params) do
    subject = conn.assigns.auth_subject
    %{"id" => id} = params
    board_id = String.to_integer(id)

    can_update =
      from(
        ab in AccountBoard,
        where: ab.account_subject == ^subject and ab.board_id == ^board_id
      )
      |> Repo.exists?()

    if can_update do
      board =
        %Board{id: board_id}
        |> Board.changeset(params)
        |> Repo.update!()
        |> Jason.encode!()

      send_resp(conn, 200, board)
    end

    send_resp(conn, 404, "Board Not Found")
  end

  def delete(conn, %{"id" => id}) do
    board_id = String.to_integer(id)

    {:ok, board} =
      Repo.transaction(fn ->
        from(ab in AccountBoard, where: ab.board_id == ^board_id)
        |> Repo.one!()
        |> Repo.delete!()

        %Board{id: board_id, devices: []}
        |> Repo.delete!()
        |> Jason.encode!()
      end)

    send_resp(conn, 200, board)
  end
end
