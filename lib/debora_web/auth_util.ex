defmodule DeboraWeb.AuthUtil do
  import Plug.Conn
  alias JOSE.JWT

  def get_authorization_token(conn) do
    case get_req_header(conn, "authorization") do
      [authorization] ->
        case String.split(authorization, "Bearer ") do
          [_, id_token] -> id_token
          _ -> nil
        end

      _ ->
        nil
    end
  end

  def get_kid(token) do
    protected = JWT.peek_protected(token)
    {_, %{"kid" => kid}} = JOSE.JWS.to_map(protected)
    kid
  end
end
