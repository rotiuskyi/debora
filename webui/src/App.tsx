import { Routes, Route } from "react-router-dom";
import inject from "./inject";
import DependencyProvider from "./DependencyProvider";
import { Path } from "./@infra.const/Path";
import AuthLayout from "./auth/AuthLayout";
import AuthGuard from "./auth/AuthGuard";
import LoginPage from "./auth/LoginPage";
import IdTokenPage from "./auth/IdTokenPage";
import Layout from "./layout/Layout";
import IndexPage from "./index/IndexPage";
import CurrBoard from "./board/CurrBoard";
import BoardList from "./board/BoardList";

interface AppProps {
  Path: typeof Path;
}

function App({ Path }: AppProps) {
  return (
    <DependencyProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={Path.Login} element={<LoginPage />} />
          <Route path={Path.Auth} element={<IdTokenPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route path={Path.Index} element={<IndexPage />} />

          <Route element={<AuthGuard />}>
            <Route path={Path.BoardList} element={<BoardList />} />
            <Route path={Path.CurrBoard} element={<CurrBoard />} />
          </Route>
        </Route>
      </Routes>
    </DependencyProvider>
  );
};

export default inject(App, {
  Path
});
