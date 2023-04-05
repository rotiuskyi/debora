import { Link, Outlet } from "react-router-dom";
import AuthStatus from "../auth/AuthStatus";
import { Path } from "../routePath";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <AuthStatus />
      <ul>
        <li>
          <Link to={Path.Index}>Home (public)</Link>
        </li>
        <li>
          <Link to={Path.BoardList}>Board List</Link>
        </li>
        <li>
          <Link to={`${Path.BoardList}/1`}>Current Board</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Layout;
