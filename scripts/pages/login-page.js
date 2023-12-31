import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import STORE from "../store.js";
import { login } from "../services/session-service.js";
import { root } from "../config.js";
import SignupPage from "./sign-up-page.js";
import HomePage from "./home-page.js";
import { getTasks } from "../services/todo-services.js";
import { renderHeader } from "../components/header.js";

function render() {
  return `
  ${renderHeader()}
    <section class="section-sm pad-sm">
      <div class="container flex flex-column gap-4 items-center">
        <form action="" class="full-width container-sm flex flex-column gap-4 w-500 js-login-form">
          ${input({
            label: "Email",
            id: "email",
            required: true,
            placeholder: "user@mail.com",
            error: this.state.errors.username,
          })}
          ${input({
            label: "Password",
            id: "password",
            required: true,
            type: "password",
            placeholder: "******",
            error: this.state.errors.password,
          })}
          <button type="submit" class="button button--primary width-full">
            Login
          </button>
        </form>
        ${
          this.state.errors.form
            ? `
          <p class="error-300">${this.state.errors.form}</p>
        `
            : ""
        }
        <a class="js-create-account">Create Account</a>
      </div>
    </section>
  `;
}

function listenSubmit() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    let user;
    try {
      user = await login(credentials);
    } catch (error) {
      throw new Error(response.statusText);
      // this.state.errors.form = error.message;
      // DOMHandler.reload();
    }
    STORE.setUser(user);
    STORE.setCurrentPage("home");

    let tasks = await getTasks();
    STORE.setTasks(tasks);
    STORE.setFilterTasks(tasks);
    DOMHandler.load(HomePage(), root);
  });
}

function listenCreateAccount() {
  const link = document.querySelector(".js-create-account");
  link.addEventListener("click", (event) => {
    event.preventDefault();

    STORE.setCurrentPage("signup");
    DOMHandler.load(SignupPage(), root);
  });
}

function LoginPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmit.call(this);
      listenCreateAccount();
    },
    state: {
      errors: {},
      testPage: "LoginPage",
    },
  };
}

export default LoginPage;
