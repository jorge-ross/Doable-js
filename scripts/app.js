import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/login-page.js";
import SignupPage from "./pages/sign-up-page.js";
import HomePage from "./pages/home-page.js";
import { tokenKey, root } from "./config.js";
import STORE from "./store.js";

const router = {
  login: LoginPage,
  signup: SignupPage,
  todo: HomePage,
};

async function App() {
  const token = sessionStorage.getItem(tokenKey);
  let module;

  if (!token) {
    if (["login", "signup"].includes(STORE.currentPage)) {
      module = router[STORE.currentPage];
    } else {
      module = LoginPage;
    }

    return DOMHandler.load(module(), root);
  }

  try {
    const { token, ...user } = await getUser();
    STORE.setUser(user);

    const todos = await getTodos();
    STORE.setTodos(todos);

    module = router[STORE.currentPage];
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    module = LoginPage;
  }

  return DOMHandler.load(module(), root);
}

export default App;
