import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getPathToReturn, setIdToken, setAccount } from "./authStorage";

const IdTokenPage = () => {
  const pathToReturn = getPathToReturn();
  const [params, setParams] = useSearchParams();

  const [loadingAccount, setLoadingAccount] = useState(true);
  useEffect(() => {
    // get the idToken
    const idToken = params.get("id_token");
    // then remove it from the url
    setParams();
    fetch("/api/account", {
      headers: { "Authorization": `Bearer ${idToken}` }
    })
      .then(res => res.text())
      .then(account => {
        setIdToken(idToken!);
        setAccount(account);
      })
      .then(() => setLoadingAccount(false))
  }, []);

  if (loadingAccount) {
    return <div>Loading...</div>
  }
  return (
    <Navigate to={pathToReturn} />
  )
};

export default IdTokenPage;
