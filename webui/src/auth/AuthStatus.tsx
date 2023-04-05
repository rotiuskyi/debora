import { useNavigate } from "react-router-dom";
import { Path } from "../routePath";
import { useAuth } from "./authContext";

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate(Path.Index));
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default AuthStatus;
