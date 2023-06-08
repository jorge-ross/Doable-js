import { fromLocalStorage, saveLocalStorage } from "./utils.js";

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  todos: [],
  setUser(data) {
    this.user = data;
  },
  setCurrentPage(page) {
    saveLocalStorage("current-page", page);
    this.currentPage = page;
  },
  setTodos(todos) {
    this.todos = todos;
    saveLocalStorage("Todos", todos);
  },
  addTodo(todo) {
    this.todo.push(todo);
  },
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  },
};
export default STORE;
