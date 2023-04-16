# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :debora,
  ecto_repos: [Debora.Repo],
  generators: [binary_id: true]

# Configure your database
config :debora, Debora.Repo,
  database: System.get_env("PGDATABASE"),
  port: System.get_env("PGPORT"),
  username: System.get_env("PGUSER"),
  password: System.get_env("PGPASSWORD")

# Configure Google OAth/Opend ID Connect
config :debora,
  client_id: System.get_env("CLIENT_ID"),
  client_secret: System.get_env("CLIENT_SECRET")

# Configures the endpoint
config :debora, DeboraWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [json: DeboraWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Debora.PubSub,
  live_view: [signing_salt: "PHaumOHZ"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
