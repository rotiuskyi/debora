import { Routes, Route } from "react-router-dom";
import { Path } from "./routePath";
import { AuthProvider } from "./auth/authContext";
import AuthLayout from "./auth/AuthLayout";
import AuthGuard from "./auth/AuthGuard";
import LoginPage from "./auth/LoginPage";
import Layout from "./layout/Layout";
import IndexPage from "./index/IndexPage";
import CurrBoard from "./board/CurrBoard";
import BoardList from "./board/BoardList";
import IdTokenPage from "./auth/IdTokenPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={Path.Login} element={<LoginPage />} />
        </Route>
        <Route path={Path.Auth} element={<IdTokenPage />} />

        <Route element={<Layout />}>
          <Route path={Path.Index} element={<IndexPage />} />

          <Route element={<AuthGuard />}>
            <Route path={Path.BoardList} element={<BoardList />} />
            <Route path={Path.CurrBoard} element={<CurrBoard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
