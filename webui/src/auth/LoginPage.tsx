import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { generateHash } from "../util/hash";
import { setPathToReturn } from "./pathToReturn";

const LoginPage = () => {
  const location = useLocation();
  const pathToReturn = location.state?.from?.pathname || "/";
  setPathToReturn(pathToReturn);

  const [nonce] = useState(generateHash());

  const googleOAuthConfig = {
    response_type: "code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: "openid email profile",
    redirect_uri: "https://localhost/api/auth",
    // A random value that enables replay protection.
    nonce
  };

  const googleOAthUrl = "https://accounts.google.com/o/oauth2/v2/auth?"
    .concat(new URLSearchParams(googleOAuthConfig).toString());

  function handleLoginWithGoogle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(googleOAthUrl);
  }

  useEffect(() => {
    console.log("Login Page");
  }, []);

  return (
    <div>
      <p>You must log in to view the page at {pathToReturn}</p>
      <form onSubmit={handleLoginWithGoogle}>
        <button type="submit">Login with Google</button>
      </form>
    </div>
  );
}

export default LoginPage;
