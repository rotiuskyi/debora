defmodule DeboraWeb.Router do
  use DeboraWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug DeboraWeb.AuthPlug
  end

  scope "/api", DeboraWeb do
    pipe_through :api

    get "/", DefaultController, :index
    get "/auth", AuthController, :code_flow
    get "/auth/account", AuthController, :account

    scope "/boards" do
      pipe_through :auth

      get "/", BoardController, :all
      get "/:id", BoardController, :one
      post "/", BoardController, :create
      put "/:id", BoardController, :update
      delete "/:id", BoardController, :delete
    end
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:debora, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL  which you should anyway.
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: DeboraWeb.Telemetry
    end
  end
end
