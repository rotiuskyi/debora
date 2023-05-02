defmodule DeboraWeb.AuthPlug do
  @behaviour Plug

  alias Plug.Conn
  alias JOSE.{JWT, JWS}
  alias DeboraWeb.GoogleKeysService
  alias Debora.Repo
  alias Debora.Account

  def init(opts), do: opts

  def call(conn, opts \\ []) do
    with {:ok, token} <- get_bearer_token(conn),
         {:ok, claims} <- verify_token(token) do
      case opts do
        [] ->
          Plug.Conn.assign(conn, :auth_context, claims)

        create_account_or_return_existing: true ->
          create_account_or_return_existing(conn, claims)
      end
    else
      _ -> send_unauthorized(conn)
    end
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

  defp create_account_or_return_existing(conn, %{
         "iss" => issuer,
         "name" => user_name,
         "email" => user_email,
         "picture" => picture
       }) do
    query_result =
      case Repo.one(Account, where: [user_email: user_email]) do
        nil ->
          Repo.insert(%Account{
            issuer: issuer,
            user_name: user_name,
            user_email: user_email,
            picture: picture
          })

        account ->
          {:ok, account}
      end

    case query_result do
      {:ok, account} -> conn |> Conn.send_resp(200, Jason.encode!(account))
      _ -> send_unauthorized(conn)
    end
  end

  defp create_account_or_return_existing(conn, _) do
    send_unauthorized(conn)
  end

  defp send_unauthorized(conn) do
    conn
    |> Conn.send_resp(
      :unauthorized,
      %{message: "Invalid authorization header."} |> Jason.encode!()
    )
    |> Conn.halt()
  end
end
