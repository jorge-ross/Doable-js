import apiFetch from "./api-fetch.js";

export async function getTasks() {
  return await apiFetch("tasks");
}
