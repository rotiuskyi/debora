defmodule DeboraWeb.DefaultController do
  use Phoenix.Controller

  def index(conn, _) do
    text(conn, """
      Welcome to Debora API - #{Mix.env()}
    """)
  end
end
