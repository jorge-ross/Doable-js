import { fromLocalStorage, saveLocalStorage } from "./utils.js";
import { getTasks } from "./services/todo-services.js";

async function listTasks() {
  let currentPage = option || STORE.currentPage;
  let tasks = await getTasks();
  let newTask;

  switch (currentPage) {
    case "Important":
      newTask = tasks.filter((task) => task.important === true);
      STORE.setTasks(newTask);
      break;

    case "Incompleted":
      newTask = tasks.filter((task) => task.completed === false);
      STORE.setTasks(newTask);
      break;

    case "Important/completed":
      newTask = tasks.filter((task) => task.completed === false);
      let newTask2 = newTask.filter((task) => task.important === true);
      STORE.setTasks(newTask2);
      break;

    case "Homepage":
      STORE.setTasks(tasks);
      break;

    default:
      break;
  }
}

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  tasks: [],
  setUser(data) {
    this.user = data;
  },
  setCurrentPage(page) {
    saveLocalStorage("current-page", page);
    this.currentPage = page;
  },
  setTasks(tasks) {
    this.tasks = tasks;
    saveLocalStorage("tasks", tasks);
  },
  addTask(task) {
    this.task.push(task);
  },
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  },
  listTasks,
};
export default STORE;
