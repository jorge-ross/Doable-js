import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import { getTasks } from "../services/todo-services.js";

function HomePage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {},
    state: {
      errors: {},
    },
  };
}

// console.log("I'm here");
export default HomePage;
