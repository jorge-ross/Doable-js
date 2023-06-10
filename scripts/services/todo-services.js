import apiFetch from "./api-fetch.js";

export async function getTasks() {
  return await apiFetch("tasks");
}

export async function createTask(newTask = { title, due_date }) {
  return await apiFetch("tasks", { body: newTask });
}

export async function getTask(id) {
  return await apiFetch(`tasks/${id}`);
}
