defmodule DeboraWeb.AuthController do
  use Phoenix.Controller
  alias Plug.Conn
  alias DeboraWeb.AuthPlug

  def code_flow(conn, %{"code" => code}) do
    client_id = Application.get_env(:debora, :client_id)
    client_secret = Application.get_env(:debora, :client_secret)

    {:ok, response} =
      HTTPoison.post(
        "https://oauth2.googleapis.com/token",
        {
          :form,
          code: code,
          client_id: client_id,
          client_secret: client_secret,
          redirect_uri: "https://localhost/api/auth",
          grant_type: "authorization_code"
        },
        []
      )

    %HTTPoison.Response{status_code: 200, body: body} = response
    {:ok, %{"id_token" => id_token}} = Jason.decode(body)

    conn
    |> Conn.resp(:found, "")
    |> Conn.put_resp_header("location", "https://localhost/auth?id_token=#{id_token}")
  end

  def code_flow(conn, _) do
    Conn.send_resp(conn, 400, %{message: "Bad Request."} |> Jason.encode!())
  end

  def account(conn, _) do
    AuthPlug.call(conn, create_account_or_return_existing: true)
  end
end
