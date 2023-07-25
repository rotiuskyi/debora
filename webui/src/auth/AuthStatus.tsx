import { useNavigate } from "react-router-dom";
import { Path } from "../routePath";
import { getAccount } from "./authStorage";
import { setAccount } from "./authStorage";

const AuthStatus = () => {
  let navigate = useNavigate();
  const account = getAccount();

  if (!account?.user_email) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      {account.user_name || account.user_email}
      <button
        onClick={() => {
          // TODO: create some kind of signOut
          setAccount("")
          navigate(Path.Index)
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default AuthStatus;
