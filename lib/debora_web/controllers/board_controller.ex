defmodule DeboraWeb.BoardController do
  use Phoenix.Controller

  def show(conn, _opts) do
    Plug.Conn.send_resp(conn, 200, %{"boards" => []} |> Jason.encode!())
  end
end
