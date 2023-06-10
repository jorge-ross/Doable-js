import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login-page.js";
import STORE from "../store.js";
import { logout } from "../services/session-service.js";
import { root } from "../config.js";

function render() {
  return `
    <header class="header" style="${
      STORE.currentPage === "Homepage" ? "" : "justify-content: center"
    }">
    <div></div>
      <img src="./assets/images/doable-logo.png">
      <img class="logout" src="./assets/icons/logout.svg" style=" ${
        STORE.currentPage === "Homepage" ? "" : "display: none"
      }">
    </header>
`;
}

function listenLogout() {
  const logoutIcon = document.querySelector(".logout");

  logoutIcon.addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();
    DOMHandler.load(LoginPage(), root);
  });
}

const renderHeader = () => {
  return {
    toString() {
      return render();
    },
    addListeners() {
      listenLogout();
    },
  };
};
export { renderHeader };