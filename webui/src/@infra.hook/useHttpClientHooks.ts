import { useNavigate } from "react-router-dom";
import { Path } from "../@infra.const/Path";
import { getIdToken } from "../auth/authStorage";

export function useHttpAfterHook() {
  const navigate = useNavigate();

  return (response: Response) => {
    if (response.status === 401) {
      // Handle Unauthorized
      navigate(Path.Login);
    }
    return response;
  }
}

export function useHttpBeforeHook() {
  return (init: RequestInit) => {
    const idToken = getIdToken();
    if (idToken) {
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
      };
    }
    return init;
  };
}
