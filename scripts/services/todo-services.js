import apiFetch from "./api-fetch.js";

export async function getTasks() {
  return await apiFetch("tasks");
}

export async function createTask(data) {
  const newTask = {
    title: data.title,
    due_date: data.due_date,
  };
  return await apiFetch("tasks", { method: "POST", body: newTask });
}

export async function getTask(id) {
  return await apiFetch(`tasks/${id}`);
}

export async function deleteTask(id) {
  return await apiFetch(`tasks/${id}`, { method: "DELETE" });
}

export async function editTask(
  data = { title, due_date, important, completed },
  id
) {
  return await apiFetch(`tasks/${id}`, {
    method: "PATCH",
    body: data,
  });
}
