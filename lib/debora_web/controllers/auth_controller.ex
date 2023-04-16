defmodule DeboraWeb.AuthController do
  use Phoenix.Controller
  alias DeboraWeb.Services.GoogleKeysService

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
    |> Plug.Conn.resp(:found, "")
    |> Plug.Conn.put_resp_header("location", "https://localhost/auth?id_token=#{id_token}")
  end

  def code_flow(conn, _) do
    Plug.Conn.resp(conn, 400, "Bad Request.")
  end

  def verify_token(conn, _) do
    [authorization] = Plug.Conn.get_req_header(conn, "authorization")
    [_, id_token] = String.split(authorization, "Bearer ")

    protected = JOSE.JWT.peek_protected(id_token)
    {_, %{"kid" => kid}} = JOSE.JWS.to_map(protected)
    jwk = GoogleKeysService.fetchJWK(kid)

    {true, %JOSE.JWT{fields: fields}, _} = JOSE.JWT.verify(jwk, id_token)
    {:ok, jwtJson} = Jason.encode(fields)

    text(conn, jwtJson)
  end
end
