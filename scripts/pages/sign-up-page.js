import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import { root } from "../config.js";
import HomePage from "./home-page.js";
import { input } from "../components/input.js";
import STORE from "../store.js";
import { createUser } from "../services/user-services.js";
import { getTasks } from "../services/todo-services.js";
import { renderHeader } from "../components/header.js";

function render() {
  return `
  ${renderHeader()}
    <section class="section-sm pad-sm">
      <div class="container flex flex-column gap-4 items-center">
        <form action="" class="full-width container-sm flex flex-column gap-4 w-500 js-signup-form">
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
            type: "password",
            placeholder: "******",
            required: true,
            error: this.state.errors.password,
          })}
          <button type="submit" class="button button--primary width-full">
            Create Account
          </button>
        </form>
        ${
          this.state.errors.form
            ? `
          <p class="error-300">${this.state.errors.form}</p>
        `
            : ""
        }
        <a class="js-login-link">Login</a>
      </div>
    </section>
  `;
}

function listenSubmit() {
  const form = document.querySelector(".js-signup-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    try {
      const token = await createUser(credentials);
      STORE.setCurrentPage("Homepage");

      const tasks = await getTasks();
      STORE.setTasks(tasks);

      DOMHandler.load(HomePage(), root);
    } catch (error) {
      this.state.errors.form = error.message;
      DOMHandler.reload();
    }
  });
}

function listenLoginLink() {
  const link = document.querySelector(".js-login-link");

  link.addEventListener("click", (event) => {
    event.preventDefault();

    STORE.setCurrentPage("login");
    DOMHandler.load(LoginPage(), root);
  });
}

function SignupPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmit.call(this);
      listenLoginLink();
    },
    state: {
      errors: {},
      testPage: "SignupPage",
    },
  };
}

export default SignupPage;
