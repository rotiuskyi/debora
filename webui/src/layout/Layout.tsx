import { Link, Outlet } from "react-router-dom";
import AuthStatus from "../auth/AuthStatus";
import { Path } from "../routePath";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex col h-full">
        <div className="min-w-[250px] border-r border-gray-300 p-2">
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

          <AuthStatus />
        </div>
        <div className="my-8 mx-12">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
