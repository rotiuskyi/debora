const PATH_KEY = "path_to_return"
const ID_TOKEN_KEY = "id_token"
const ID_TOKEN_PAYLOAD_KEY = "id_token_payload"

export function setPathToReturn(path: string) {
  localStorage.setItem(PATH_KEY, path);
}

export function getPathToReturn() {
  return localStorage.getItem(PATH_KEY) || "/";
}

export function setIdToken(token: string) {
  localStorage.setItem(ID_TOKEN_KEY, token);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function setIdTokenPayload(payload: string) {
  localStorage.setItem(ID_TOKEN_PAYLOAD_KEY, payload);
}

export function getIdTokenPayload() {
  return localStorage.getItem(ID_TOKEN_PAYLOAD_KEY);
}
