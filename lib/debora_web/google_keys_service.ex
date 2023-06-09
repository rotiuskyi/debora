defmodule DeboraWeb.GoogleKeysService do
  use Agent
  alias DeboraWeb.GoogleKeysService

  @google_keys_url "https://www.googleapis.com/oauth2/v3/certs"
  @valid_till "valid_till"
  @keys "keys"
  # Google public key id for token verification
  @kid "kid"

  def start_link(_opts \\ []) do
    initial_state = %{@valid_till => DateTime.utc_now(), @keys => []}
    Agent.start_link(fn -> initial_state end, name: GoogleKeysService)
  end

  def fetchJWK(kid) do
    now = DateTime.utc_now()

    valid_till_stored =
      Agent.get(GoogleKeysService, fn %{@valid_till => valid_till} -> valid_till end)

    expired =
      case DateTime.compare(now, valid_till_stored) do
        :gt -> true
        :eq -> true
        _ -> false
      end

    keys =
      if expired do
        IO.puts("Fetch new Google keys.")
        fetch_keys_and_store()
      else
        IO.puts("Use cached Google keys.")
        Agent.get(GoogleKeysService, fn %{@keys => keys} -> keys end)
      end

    Enum.find(keys, fn %{@kid => confKid} -> confKid == kid end)
  end

  defp fetch_keys_and_store() do
    {:ok,
     %HTTPoison.Response{
       status_code: 200,
       body: body,
       headers: headersList
     }} = HTTPoison.get(@google_keys_url)

    {:ok, %{@keys => keys}} = Jason.decode(body)

    :ok =
      Agent.update(
        GoogleKeysService,
        fn _ ->
          %{
            @valid_till => get_valid_till_from(headersList),
            @keys => keys
          }
        end
      )

    keys
  end

  defp get_valid_till_from(headers) do
    seconds_left =
      with %{"Cache-Control" => cache_control, "Age" => age} <-
             headers
             |> Enum.filter(fn {key, _} -> key == "Cache-Control" or key == "Age" end)
             |> Enum.into(%{}),
           [_, max_age] <-
             cache_control
             |> String.split(",")
             |> Enum.find(fn str -> String.contains?(str, "max-age") end)
             |> String.trim()
             |> String.split("="),
           {max_age_int, _} <- Integer.parse(max_age),
           {age_int, _} <- Integer.parse(age) do
        {:ok, max_age_int - age_int}
      end

    now = DateTime.utc_now()

    case seconds_left do
      {:ok, seconds} ->
        DateTime.add(now, seconds, :second)

      _ ->
        IO.warn("Failed to get Google keys expire time.")
        now
    end
  end
end
