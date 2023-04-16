import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getPathToReturn } from "./authStorage";

const IdTokenPage = () => {
  const pathToReturn = getPathToReturn();
  const params = new URLSearchParams(location.search);
  const idToken = params.get("id_token");

  useEffect(() => {
    fetch("https://localhost/api/user/me", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      }
    })
      .then(res => res.text())
      .then(text => console.log(text));
  }, []);

  return (
    <Navigate to={pathToReturn} />
  )
};

export default IdTokenPage;
