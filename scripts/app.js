import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/login-page.js";
import HomePage from "./pages/home-page.js";
import { tokenKey, root, appKey } from "./config.js";
import STORE from "./store.js";

async function App() {
  const token = sessionStorage.getItem(tokenKey);

  let module;

  if (!token) {
    module = LoginPage;
    return DOMHandler.load(module(), root);
  }

  try {
    let tasks = await getTasks();
    STORE.setTasks(tasks);
    module = HomePage;
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    module = LoginPage;
  }

  return DOMHandler.load(module(), root);
}

export default App;
