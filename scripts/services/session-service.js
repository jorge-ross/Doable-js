import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

export async function login(credentials = { email, password }) {
  const { token } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
}

export async function logout() {
  const data = await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);

  return data;
}
