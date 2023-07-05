import { fromLocalStorage, saveLocalStorage } from "./utils.js";
import { getTasks } from "./services/todo-services.js";

// async function listTasks(option = null) {
//   let currentpage = option || STORE.currentPage;
//   let tasks = await getTasks();
//   let newTask;

//   switch (currentpage) {
//     case "Important":
//       newTask = tasks.filter((task) => task.important === true);
//       STORE.setTasks(newTask);
//       break;

//     case "Incompleted":
//       newTask = tasks.filter((task) => task.completed === false);
//       STORE.setTasks(newTask);
//       break;

//     case "Important/Incompleted":
//       newTask = tasks.filter((task) => task.completed === false);
//       let newTask2 = newTask.filter((task) => task.important === true);
//       STORE.setTasks(newTask2);
//       break;

// case "Homepage":
//   STORE.setTasks(tasks);
//   break;
//   }
// }

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
};
export default STORE;
