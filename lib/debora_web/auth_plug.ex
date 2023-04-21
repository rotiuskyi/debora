defmodule DeboraWeb.AuthPlug do
  @behaviour Plug

  alias Plug.Conn
  alias JOSE.{JWT, JWS}
  alias DeboraWeb.GoogleKeysService

  def init(opts), do: opts

  def call(conn, opts \\ []) do
    with {:ok, token} <- get_bearer_token(conn),
         {:ok, claims} <- verify_token(token) do
      case opts do
        [] ->
          conn

        respond_with_jwt_claims: true ->
          send_claims(conn, claims)
      end
    else
      _ -> send_unauthorized(conn)
    end
  end

  defp send_unauthorized(conn) do
    conn
    |> Conn.send_resp(
      :unauthorized,
      %{message: "Invalid authorization header."} |> Jason.encode!()
    )
    |> Conn.halt()
  end

  defp send_claims(conn, claims) do
    conn |> Conn.send_resp(200, Jason.encode!(claims)) |> Conn.halt()
  end

  defp get_bearer_token(conn) do
    with [authorization] <- Conn.get_req_header(conn, "authorization"),
         [_, token] <- String.split(authorization, "Bearer ") do
      {:ok, token}
    else
      _ -> nil
    end
  end

  defp verify_token(token) do
    with {_, %{"kid" => kid}} <- JWT.peek_protected(token) |> JWS.to_map(),
         {true, %JWT{fields: fields}, _} <- GoogleKeysService.fetchJWK(kid) |> JWT.verify(token) do
      {:ok, fields}
    else
      _ ->
        IO.puts("id_token is invalid.")
        nil
    end
  end
end
