import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import STORE from "../store.js";
import { login } from "../services/session-service.js";
import { root } from "../config.js";
import SignupPage from "./sign-up-page.js";
import HomePage from "./home-page.js";
import { getTasks } from "../services/todo-services.js";

function render() {
  return `
    <section class="section-lg">
      <div class="container flex flex-column gap-8 items-center">
        <img src="/assets/images/doable-logo.png" alt="doable logo" />
        <h1 class="heading">Login</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-login-form">
          ${input({
            label: "Email",
            id: "email",
            required: true,
            placeholder: "user@mail.com",
          })}
          ${input({
            label: "Password",
            id: "password",
            required: true,
            type: "password",
            placeholder: "******",
          })}
          <button type="submit" class="button button--secondary width-full">
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

    try {
      await login(credentials);
      STORE.setCurrentPage("Homepage");

      let tasks = await getTasks();
      STORE.setTasks(tasks);

      DOMHandler.load(HomePage(), root);
    } catch (error) {
      this.state.errors.form = error.message;
      DOMHandler.reload();
    }
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
