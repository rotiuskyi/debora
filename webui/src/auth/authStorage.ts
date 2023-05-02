// TODO: use type provided by backend API spec
interface Account {
  id: number;
  user_name?: string;
  user_email: string;
  picture?: string;
}

const PATH_KEY = "debora_path_to_return";
const ID_TOKEN_KEY = "debora_id_token";
const ACCOUNT_KEY = "debora_account";

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

export function setAccount(account: string) {
  localStorage.setItem(ACCOUNT_KEY, account);
}

export function getAccount() {
  const item = localStorage.getItem(ACCOUNT_KEY);
  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item) as Account;
  } catch (err) {
    console.warn(`Failed to deserialize localStorage item by the key "${ACCOUNT_KEY}"!`);
    return null;
  }
}
