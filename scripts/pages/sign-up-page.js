import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import { root } from "../config.js";
import HomePage from "./home-page.js";
import { input } from "../components/input.js";
import STORE from "../store.js";

function render() {
  return `
    <section class="section-lg">
      <div class="container flex flex-column gap-8 items-center">
        <img src="/assets/images/doable-logo.png" alt="rankable logo" />
        <h1 class="heading">Create Account</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-signup-form">
          ${input({
            label: "Email",
            id: "email",
            required: true,
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
          <button type="submit" class="button button--secondary width-full">
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
      await login(credentials);
      STORE.setCurrentPage("homepage");

      const todos = await getTodos();
      STORE.setTodos(todos);

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
