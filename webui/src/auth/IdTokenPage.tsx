import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getPathToReturn, setIdToken, setIdTokenPayload } from "./authStorage";

const IdTokenPage = () => {
  const pathToReturn = getPathToReturn();
  const [params, setParams] = useSearchParams();

  const [loadingPayload, setLoadingPayload] = useState(true);
  useEffect(() => {
    // get the idToken
    const idToken = params.get("id_token");
    // then remove it from the url
    setParams();
    fetch("https://localhost/api/auth/verify", {
      headers: { "Authorization": `Bearer ${idToken}` }
    })
      .then(res => res.text())
      .then(payload => {
        setIdToken(idToken!);
        setIdTokenPayload(payload);
      })
      .then(() => setLoadingPayload(false))
  }, []);

  if (loadingPayload) {
    return <div>Loading...</div>
  }
  return (
    <Navigate to={pathToReturn} />
  )
};

export default IdTokenPage;
