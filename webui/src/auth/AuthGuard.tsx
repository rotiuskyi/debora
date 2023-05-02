import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Path } from "../routePath";
import { getAccount } from "./authStorage";

const AuthGuard = () => {
  const account = getAccount();
  const location = useLocation();

  if (!account?.user_email) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={Path.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
