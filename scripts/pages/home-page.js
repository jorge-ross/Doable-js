import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import { getTasks } from "../services/todo-services.js";

function render() {
  let tasks = STORE.tasks;
  return `
  <main class="section-sm flex flex-column">
    <div class="flex flex-column gap-4 ">
        <section class="flex flex-column gap-4">
            <div class=" flex gap-4">
                <p class="content-sm">Sort</p>
                <select name="sort" id="sort" class="select select__input">
                <option value="Option">Select Option</option>
                    <option value="Alphabetical">Alphabetical(a-z)</option>
                    <option value="Date">Due date</option>
                    <option value="Importance">Importance</option>
                </select>
            </div>
            <div class="flex gap-4">
                <p class="content-sm">Show</p>
                <div class="flex gap-2">
                <input class="checkbox" type="checkbox" name="Incompleted" id="Incompleted" ${
                  STORE.currentPage === "Incompleted" ||
                  STORE.currentPage === "Important/completed"
                    ? "checked"
                    : ""
                } >
                <label>Only pending</label>
                </div>  
                <div class="flex gap-2">
                <input class="checkbox checkbox__input checkbox" type="checkbox" name="Important" id="important" ${
                  STORE.currentPage === "Important" ||
                  STORE.currentPage === "Important/completed"
                    ? "checked"
                    : ""
                } >
                <label class="content-sm" for="Important">Only Important</label>
                </div>      
            </div>
        </section>
        <section class="">
            <!-- <label for="aea"> -->
           
        </section>
    </div>
        <form class="full-width container-sm flex flex-column gap-4">
        ${input({
          id: "title",
          required: true,
          type: "text",
          placeholder: "Do the dishes...",
        })}
        ${input({
          id: "due_date",
          required: true,
          type: "date",
          placeholder: "dd/mm/yy",
        })}
        <button class="button button--primary width-full">Add task</button>
      </form>
    </main>`;
}

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

export default HomePage;
