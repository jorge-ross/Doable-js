import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import { renderHeader } from "../components/header.js";
import { createTask, editTask } from "../services/todo-services.js";
import { Filtering } from "../utils.js";

function renderTask(task) {
  return `
  <div class="show-task flex gap-4 ${
    task.important ? "important" : ""
  }" id="task-${task.id}">
  <div class="check-g">
  <input type="checkbox" name="Task" id="${
    task.id
  }"class="checkbox checkbox__input check" ${task.completed ? "checked" : ""} >
  </div>
  <div class="full-width">
    <div class="flex gap-4 justify-between">
      <p class="w-600">${task.title}</p>  
              
      <i class="importance ri-error-warning-fill ri-lg" style="line-height: 1.3rem; color: ${
        task.important ? (task.completed ? "#F9A8D4" : "#EC4899") : "#D1D5DB"
      }" id="${task.id}"></i>
      </div>
      <p class="task-content w-400">${
        task.due_date
          ? new Date(task.due_date).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
          : ""
      }</p>
  </div>
</div>`;
}

function render() {
  let tasks = STORE.tasks;
  return `
  ${renderHeader()}
  <main class="section-sm flex flex-column">
    <div class="flex flex-column gap-4 ">
        <section class="flex flex-column gap-4">
            <div class=" flex gap-8">
                <p class="content-sm w-500">Sort</p>
                <select name="sort" id="sort" class="js-select select select__input">
                <option value='' selected disabled hidden>Select Option</option>
                    <option value="Alphabetical">Alphabetical (a-z)</option>
                    <option value="Date">Due date</option>
                    <option value="Importance">Importance</option>
                </select>
            </div>
            <div class="flex">
              <div class="show-flex">
                <p class="content-sm w-500">Show</p>
              </div>
              <div class="flex-spi">
              <div class="flex gap-2 w-500">
                <input class="checkbox checkbox__input check--pending" type="checkbox" name="Incompleted" id="Incompleted" ${
                  STORE.filter.pending ? "checked" : ""
                } >
                <label>Only pending</label>
                </div>  
                <div class="flex gap-2 w-500">
                <input class="checkbox checkbox__input check--important" type="checkbox" name="Important" id="Important" ${
                  STORE.filter.important ? "checked" : ""
                } >
                <label class="content-sm w-500" for="Important">Only Important</label>
                </div>  
              </div>      
            </div>
        </section>
        <section>
          ${tasks.map(renderTask).join("")}
        </section>
    </div>
      <form class="full-width container-sm container-add flex flex-column gap-4 task-form">
      ${input({
        id: "title",
        required: true,
        type: "text",
        placeholder: "Do the dishes...",
      })}
      ${input({
        id: "due_date",
        required: false,
        type: "date",
      })}
      <button class="button button--primary width-full">Add task</button>
    </form>
  </main>`;
}

function listenCheck() {
  const listChecked = document.querySelectorAll(".check");

  listChecked.forEach((task) => {
    task.addEventListener("change", async (event) => {
      const taskDone = event.target.closest(`#task-${task.id}`);

      if (!taskDone) return;

      if (task.checked) {
        const upTask = await editTask({ completed: true }, task.id);
        STORE.updateTask(upTask);
        Filtering(STORE.filteredTasks);
        DOMHandler.reload();
        // console.log(taskDone);
      } else {
        const upTask = await editTask({ completed: false }, task.id);
        STORE.updateTask(upTask);
        Filtering(STORE.filteredTasks);
        DOMHandler.reload();
        // console.log(updatedTask);
      }
    });
  });
}

function listenIcon() {
  const listImportant = document.querySelectorAll(".importance");

  listImportant.forEach((task) => {
    task.addEventListener("click", async (event) => {
      const importantTask = event.target.closest(`#task-${task.id}`);
      const hasClass = importantTask.classList.contains("important");
      // console.log(importantTask);

      if (!importantTask) return;

      if (!hasClass) {
        const upTask = await editTask({ important: true }, task.id);
        STORE.updateTask(upTask);
        Filtering(STORE.filteredTasks);
        DOMHandler.reload();
      } else {
        const impTask = await editTask({ important: false }, task.id);
        STORE.updateTask(impTask);
        Filtering(STORE.filteredTasks);
        DOMHandler.reload();
      }
    });
  });
}

function listenPending() {
  const listenCheck = document.querySelector(".check--pending");
  listenCheck.addEventListener("change", function () {
    STORE.setFilter("pending");
    Filtering(STORE.filteredTasks);
    DOMHandler.reload();
    // console.log(pendingTasks);
  });
}

function listenImportant() {
  const listenIcon = document.querySelector(".check--important");
  listenIcon.addEventListener("change", function () {
    STORE.setFilter("important");
    Filtering(STORE.filteredTasks);
    DOMHandler.reload();
  });
}

function listenSort() {
  const select = document.querySelector(".js-select");
  select.addEventListener("change", function (event) {
    const option = event.target.value;
    STORE.setSort(option);
    Filtering(STORE.filteredTasks);

    DOMHandler.reload();
  });
}

function listenSubmit() {
  const form = document.querySelector(".task-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { title, due_date } = event.target;
    const taskData = {
      title: title.value,
      due_date: due_date.value,
    };
    const newTask = await createTask(taskData);
    STORE.addTask(newTask);
    DOMHandler.reload();
  });
}

function HomePage() {
  return {
    toString() {
      return render();
    },
    addListeners() {
      listenSubmit();
      listenCheck();
      listenImportant();
      listenSort();
      listenPending();
      listenIcon();
      renderHeader().addListeners();
    },
  };
}

export default HomePage;
