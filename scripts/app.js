import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/login-page.js";
// import HomePage from "./pages/home-page.js";
import { tokenKey, root, appKey } from "./config.js";
import STORE from "./store.js";

let module;
async function App() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) throw new Error();
    module = HomePage;
    await STORE.listtasks();
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    localStorage.removeItem("Task");
    localStorage.removeItem(appKey);
    module = LoginPage;
  }

  DOMHandler.load(module(), root);
}

export default App;
