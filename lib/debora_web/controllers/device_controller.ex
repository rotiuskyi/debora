defmodule DeboraWeb.DeviceController do
  use Phoenix.Controller

  import Plug.Conn
  import Ecto.Query

  alias Debora.AccountBoard
  alias Debora.Device
  alias Debora.Repo

  def create(conn, params) do
    subject = conn.assigns.auth_subject
    %{"board_id" => board_id} = params
    board_id_int = String.to_integer(board_id)

    if board_exists?(subject, board_id_int) do
      device =
        %Device{}
        |> Device.chancheset_to_create(params)
        |> Repo.insert!()
        |> Jason.encode!()

      send_resp(conn, 201, device)
    end

    send_board_not_found(conn)
  end

  def update(conn, params) do
    subject = conn.assigns.auth_subject
    %{"board_id" => board_id, "id" => device_id} = params

    board_id_int = String.to_integer(board_id)
    device_id_int = String.to_integer(device_id)

    if board_exists?(subject, board_id_int) do
      device =
        %Device{id: device_id_int}
        |> Device.changeset_to_update(params)
        |> Repo.update!()
        |> Jason.encode!()

      send_resp(conn, 200, device)
    end

    send_board_not_found(conn)
  end

  def delete(conn, params) do
    subject = conn.assigns.auth_subject
    %{"board_id" => board_id, "id" => device_id} = params

    if board_exists?(subject, board_id) do
      device =
        %Device{id: device_id}
        |> Repo.delete!()
        |> Jason.encode!()

      send_resp(conn, 200, device)
    end

    send_board_not_found(conn)
  end

  defp board_exists?(subject, board_id) do
    from(ab in AccountBoard,
      where: ab.account_subject == ^subject and ab.board_id == ^board_id
    )
    |> Repo.exists?()
  end

  defp send_board_not_found(conn) do
    send_resp(conn, 404, "Board Not Found.")
  end
end
