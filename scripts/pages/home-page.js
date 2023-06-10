import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import { createTask } from "../services/todo-services.js";

function renderTask(task) {
  return `<div class="show-task flex gap-4 ${
    task.completed ? "checked" : ""
  }" id="task-${task.id}">
  <input type="checkbox" name="task" id="${
    task.id
  }"class="checkbox checkbox__input check" ${task.completed ? "checked" : ""} >
  <div class="full-width">
    <div class="flex gap-4 justify-between">
      <p>${task.title}</p>  
      <i class="ri-error-warning-fill ri-lg" style="line-height: 1.3rem;"hidden></i>        
      <i class="importance ri:error-warning-fill ri-lg" style="line-height: 1.3rem; color: ${
        task.important ? (task.completed ? "#F9A8D4" : "#EC4899") : "#D1D5DB"
      }" id="${task.id}"></i>
      </div>
      <p class="content-sm">${new Date(task.due_date).toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}</p>
  </div>
</div>`;
}

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
                <input class="checkbox checkbox__input checkbox" type="checkbox" name="Important" id="Important" ${
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
          ${tasks.map(renderTask).join("")}
        </section>
    </div>
      <form class="full-width container-sm flex flex-column gap-4 task-form">
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

function listenSubmit() {
  const form = document.querySelector(".task-form ");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { title, due_date } = event.target.elements;
    const taskData = {
      title: title.value,
      due_date: due_date.value,
    };
    try {
      const newTask = await createTask(taskData);
      STORE.addTask(newTask);
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

function listenCheck() {
  const listDos = document.querySelectorAll(".check");

  listDos.forEach((task) => {
    task.addEventListener("change", async (event) => {
      const taskDone = event.target.closest(`#task-${task.id}`);
      if (!taskDone) return;
      if (task.checked) {
        taskDone.classList.add("checked");
        editTask({ completed: true }, task.id);
      } else {
        taskDone.classList.remove("checked");
        editTask({ completed: false }, task.id);
      }
    });
  });
}

function listenChecklist() {
  const listencheck = document.querySelectorAll(".checkbox--optionList");

  listencheck.forEach((task) => {
    task.addEventListener("change", async (event) => {
      event.target.setAttribute("checked", "");
      const option = event.target.id;
      let newCurrentpage, newTask;
      if (task.checked) {
        switch (option) {
          case "Important":
            newTask = STORE.tasks.filter((task) => task.important === true);
            STORE.setTasks(newTask);
            newCurrentpage =
              STORE.currentPage === "Incompleted"
                ? "Important/completed"
                : "Important";
            break;

          case "Incompleted":
            newTask = STORE.tasks.filter((task) => task.completed === false);
            STORE.setTasks(newTask);
            newCurrentpage =
              STORE.currentPage === "Important"
                ? "Important/completed"
                : "Incompleted";
            break;

          default:
            break;
        }
        STORE.setCurrentPage(newCurrentpage);
        DOMHandler.reload();
      } else {
        switch (option) {
          case "Important":
            newCurrentpage =
              STORE.currentPage === "Important/completed"
                ? "Incompleted"
                : "Homepage";
            break;

          case "Incompleted":
            newCurrentpage =
              STORE.currentPage === "Important/completed"
                ? "Important"
                : "Homepage";
            break;

          default:
            break;
        }
        STORE.setCurrentPage(newCurrentpage);
        await STORE.listTasks();
        DOMHandler.reload();
      }
    });
  });
}

function listenImportant() {
  const importanceIcon = document.querySelectorAll(".importance");

  importanceIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      const task = STORE.tasks.find((task) => task.id == icon.id);
      if (!task) return;

      if (task.important) {
        task.important = false;
        editTask({ important: false }, task.id);
      } else {
        task.important = true;
        editTask({ important: true }, task.id);
      }
      STORE.deleteTask(task.id);
      STORE.addTask(task);
      DOMHandler.reload();
    });
  });
}

function listenSort() {
  const select = document.querySelector(".select");
  select.addEventListener("change", function (event) {
    const option = event.target.value;
    let data = STORE.tasks;
    let sortTask;
    switch (option) {
      case "Alphabetical":
        sortTask = data.sort(function (a, b) {
          if (a.title < b.title) return -1;

          if (a.title > b.title) return 1;

          return 0;
        });
        STORE.setTasks(sortTask);
        DOMHandler.reload();
        break;

      case "Date":
        sortTask = data.sort(function (a, b) {
          if (a.due_date < b.due_date) return 1;

          if (a.due_date > b.due_date) return -1;

          return 0;
        });
        STORE.setTasks(sortTask);
        DOMHandler.reload();
        break;

      case "Importance":
        sortTask = data.sort(function (a, b) {
          if (a.important > b.important) return -1;

          if (a.important < b.important) return 1;

          return 0;
        });
        STORE.setTasks(sortTask);
        DOMHandler.reload();
        break;

      default:
        break;
    }
  });
}

function HomePage() {
  return {
    toString() {
      return render();
    },
    addListeners() {
      listenSubmit;
      listenCheck;
      listenChecklist;
      listenImportant;
      listenSort;
    },
  };
}

export default HomePage;
