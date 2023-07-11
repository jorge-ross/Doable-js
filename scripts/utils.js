import { appKey } from "./config.js";
import STORE from "./store.js";

export function fromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(appKey)) || {};
  return data[key];
}

export function saveLocalStorage(key, value) {
  let data = JSON.parse(localStorage.getItem(appKey)) || {};
  data = { ...data, [key]: value };

  localStorage.setItem(appKey, JSON.stringify(data));
}

export function filterList(allTasks) {
  return allTasks.filter(
    (task) =>
      (!STORE.filter.pending || !task.completed) &&
      (!STORE.filter.important || task.important)
  );
}

export function Filtering(tasks) {
  const filterTasks = filterList(tasks);
  STORE.setFilterTasks(filterTasks);
}
