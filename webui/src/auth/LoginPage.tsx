import { useLocation } from "react-router-dom";
import { generateHash } from "../util/hash";
import { setPathToReturn } from "./authStorage";

const googleOAuthConfig = {
  response_type: "code",
  client_id: import.meta.env.VITE_CLIENT_ID,
  scope: "openid email profile",
  redirect_uri: "https://localhost/api/auth",
  // A random value that enables replay protection.
  nonce: generateHash()
};
const googleOAthUrl = "https://accounts.google.com/o/oauth2/v2/auth?"
  .concat(new URLSearchParams(googleOAuthConfig).toString());

const LoginPage = () => {
  const location = useLocation();
  const pathToReturn = location.state?.from?.pathname || "/";
  setPathToReturn(pathToReturn);

  return (
    <div className="border rounded mt-12 mx-auto w-[400px] p-6">
      <h3>You must log in to view the page at
        <span className="text-blue-500"> {pathToReturn}</span>
      </h3>
      <form onSubmit={handleLoginWithGoogle}>
        <button type="submit" className="text-blue-800">Login with Google</button>
      </form>
    </div>
  );
}

export default LoginPage;

function handleLoginWithGoogle(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  window.location.replace(googleOAthUrl);
}
