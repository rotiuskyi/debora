defmodule GullWeb.UserController do
  use Phoenix.Controller
  alias GullWeb.Services.GoogleKeysService

  def profile(conn, _) do
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
