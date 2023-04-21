defmodule DeboraWeb.AuthPlug do
  @behaviour Plug

  import Plug.Conn
  alias JOSE.JWT
  alias DeboraWeb.AuthUtil
  alias DeboraWeb.Services.GoogleKeysService

  def init(opts), do: opts

  def call(conn, _opts) do
    case AuthUtil.get_authorization_token(conn) do
      nil ->
        conn |> send_unauthorized_response("Invalid authorization header")

      token ->
        case JWT.verify(token, AuthUtil.get_kid(token) |> GoogleKeysService.fetchJWK()) do
          {true, _, _} -> conn
          _ -> send_unauthorized_response(conn, "Invalid token")
        end
    end
  end

  defp send_unauthorized_response(conn, mess) do
    conn
    |> send_resp(:unauthorized, %{error: mess} |> Jason.encode!())
    |> halt()
  end
end
