import apiFetch from "./api-fetch.js";

export async function getTodos() {
  return await apiFetch("todos");
}
