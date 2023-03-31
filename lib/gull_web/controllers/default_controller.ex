defmodule GullWeb.DefaultController do
  use Phoenix.Controller

  def index(conn, _) do
    text(conn, """
      Welcome to Gull API - #{Mix.env()}
    """)
  end
end
