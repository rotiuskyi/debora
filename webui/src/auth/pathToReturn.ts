import { generateHash } from "../util/hash";

const PATH_KEY = generateHash();

export function setPathToReturn(path: string) {
  localStorage.setItem(PATH_KEY, path);
}

export function getPathToReturn() {
  return localStorage.getItem(PATH_KEY) || "/";
}
