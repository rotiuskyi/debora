import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getPathToReturn } from "./pathToReturn";

const IdTokenPage = () => {
  const pathToReturn = getPathToReturn();
  const params = new URLSearchParams(location.search);
  const idToken = params.get("id_token");

  useEffect(() => {
    fetch("https://localhost/api/user/profile", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      }
    })
      .then(res => res.text())
      .then(text => console.log("Text:", text));
  }, []);

  return <></>;
  return (
    <Navigate to={pathToReturn} />
  )
};

export default IdTokenPage;
