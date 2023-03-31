import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import "./index.css"

import RootPage from "./root/RootPage"
import AboutPage from "./about/AboutPage"
import LoginPage from "./auth/LoginPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "login",
    element: <LoginPage />
  }
])

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
)
