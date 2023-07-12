import { getTasks } from "./services/todo-services.js";
import { fromLocalStorage, saveLocalStorage } from "./utils.js";

async function listTasks(option = null) {
  let current = option || STORE.currentPage;
  let tasks = await getTasks();

  switch (current) {
    case "home":
      STORE.setTasks(tasks);
      STORE.setFilterTasks(tasks);
      break;
  }
}

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  tasks: [],
  filteredTasks: [],
  filter: {
    pending: false,
    important: false,
  },
  setUser(data) {
    this.user = data;
    saveLocalStorage("user", data);
  },
  setFilter(type) {
    this.filter[type] = !this.filter[type];
  },
  updateTask(upTask) {
    this.filteredTasks = this.filteredTasks.map((task) =>
      task.id === upTask.id ? upTask : task
    );
  },
  setCurrentPage(page) {
    saveLocalStorage("current-page", page);
    this.currentPage = page;
  },
  setTasks(tasks) {
    this.filteredTasks = tasks;
    saveLocalStorage("Tasks", tasks);
  },
  setFilterTasks(tasks) {
    this.tasks = tasks;
  },
  addTask(task) {
    this.filteredTasks.push(task);
  },
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  },
  listTasks,
};
export default STORE;
