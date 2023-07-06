import { getTasks } from "./services/todo-services.js";
import { fromLocalStorage, saveLocalStorage } from "./utils.js";

async function listTasks(option = null) {
  let current = option || STORE.currentPage;
  let tasks = await getTasks();

  switch (current) {
    case "home":
      STORE.setTasks(tasks);
      break;
  }
}

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  tasks: [],
  allTasks: [],
  filter: {
    pending: false,
    important: false,
  },
  setUser(data) {
    this.user = data;
    saveLocalStorage("user", data);
  },
  setPending() {
    this.pending = !this.pending;
  },
  updateTask(task) {
    const index = this.allTasks.findIndex((element) => element.id === task.id);
    if (index === -1) return;
    this.allTasks[index] = task;
  },
  setCurrentPage(page) {
    saveLocalStorage("current-page", page);
    this.currentPage = page;
  },
  setTasks(tasks) {
    this.allTasks = tasks;
    saveLocalStorage("Tasks", tasks);
  },
  setFilterTasks(tasks) {
    this.tasks = tasks;
  },
  addTask(task) {
    this.tasks.push(task);
  },
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  },
  listTasks,
};
export default STORE;
