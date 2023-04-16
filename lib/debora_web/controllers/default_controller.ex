defmodule DeboraWeb.DefaultController do
  use Phoenix.Controller

  def index(conn, _) do
    conn
    |> Plug.Conn.put_resp_header("Content-Type", "text/html")
    |> text("<h1>Welcome to Debora API - #{Mix.env()}</h1>")
  end
end
