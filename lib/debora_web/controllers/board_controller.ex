defmodule DeboraWeb.BoardController do
  use Phoenix.Controller
  import Plug.Conn

  def show(conn, _opts) do
    send_resp(conn, 200, %{"boards" => []} |> Jason.encode!())
  end
end
