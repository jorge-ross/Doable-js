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

export function sortTasks(allTasks) {
  let sortedTask;

  switch (STORE.sort) {
    case "Alphabetical":
      sortedTask = allTasks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Date":
      sortedTask = allTasks.sort((a, b) => {
        if (a.due_date === null && b.due_date === null) return 0;
        if (a.due_date === null) return 1;
        if (b.due_date === null) return -1;

        const dateOne = new Date(a.due_date);
        const dateTwo = new Date(b.due_date);

        return dateOne - dateTwo;
      });
      break;
    case "Importance":
      sortedTask = allTasks.sort((a, b) => {
        if (a.important && !b.important) {
          return -1;
        }
        if (!a.important && b.important) {
          return 1;
        }
        return 0;
      });
      break;

    default:
      sortedTask = allTasks;
      break;
  }
  return sortedTask;
}

export function Filtering(allTasks) {
  const filterTasks = filterList(allTasks);
  const sortedTasks = sortTasks(filterTasks);
  STORE.setFilterTasks(sortedTasks);
}
