defmodule Gull.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      GullWeb.Telemetry,
      # Start the Ecto repository
      Gull.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Gull.PubSub},
      # Start the Endpoint (http/https)
      GullWeb.Endpoint,
      GullWeb.Services.GoogleKeysService
      # Start a worker by calling: Gull.Worker.start_link(arg)
      # {Gull.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Gull.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    GullWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
