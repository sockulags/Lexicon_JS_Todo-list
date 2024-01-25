import { icons, selectors } from "./constants.js";

const addNew = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const todoCards = [];
let currentAuthor;
addNew.addEventListener("click", () => {
  currentAuthor = document.querySelector("option:checked");

  if (!currentAuthor.innerText.includes("--")) {
    newTodoItem(input.value);
    input.value = "";
  } else {
    alert("Choose an author..");
  }
});

newTodoItem("Plocka äpplen");
newTodoItem("Lunch");
newTodoItem("Dricka kaffe");

attachIconListeners();
function attachIconListeners() {
  document.querySelectorAll("span").forEach((icon) => {
    icon.removeEventListener("click", handleSpanClick);
  });
  document.querySelectorAll("span").forEach((icon) => {
    icon.addEventListener("click", handleSpanClick);
  });

  document.querySelectorAll("i").forEach((edit) => {
    edit.removeEventListener("click", handleEditClick);
  });
  document.querySelectorAll("i").forEach((edit) => {
    edit.addEventListener("click", handleEditClick);
  });
}

function handleSpanClick(e) {
  const todoItem = e.target.closest(".todo-item");
  switch (e.target.id) {
    case "upArrow":
      tryMoveUp(todoItem);
      break;
    case "downArrow":
      tryMoveDown(todoItem);
      break;
    case "delete":
    case "done":
      todoItem.remove();
      break;
  }
}

function handleEditClick(e) {
  const taskText = e.target.nextElementSibling;
  taskText.disabled = false;
  taskText.addEventListener("input", (key) => {
    if (key.key === "Enter") {
      taskText.blur();
    } else {
      taskText.style.width = getInputWidth(taskText.value.length);
    }
  });
}

function getInputWidth(length) {
  let width = (length + 1) * 8;
  return width > 185 ? "185px" : `${width}px`;
}

function tryMoveUp(element) {
  const elementBefore = element.previousElementSibling;
  if (elementBefore && elementBefore.classList.contains("todo-item")) {
    element.parentNode.insertBefore(element, elementBefore);
  }
}

function tryMoveDown(element) {
  const elementAfter = element.nextElementSibling;
  if (elementAfter && elementAfter.classList.contains("todo-item")) {
    element.parentNode.insertBefore(elementAfter, element);
  }
}

function newTodoItem(text) {
  const task = createElement("input", "task");
  task.setAttribute("disabled", "true");
  task.setAttribute("value", text);
  task.value = text;
  task.style.width = getInputWidth(task.value.length);
  let currDate = getCurrentDateTime(),
    currAuthor = getAuthor();
  const taskDiv = createElement("div", "todo-item");
  taskDiv.innerHTML = todoCard(task.outerHTML, currAuthor, currDate);

  const iconsDiv = createElement("div", "icons");
  Object.values(icons).forEach((icon) => (iconsDiv.innerHTML += icon.html));

  taskDiv.appendChild(iconsDiv);

  let todoTask = {
    card: taskDiv,
    author: currAuthor,
    date: currDate,
  };
  todoCards.push(todoTask);

  container.appendChild(taskDiv);
}

function todoCard(inputelement, author, date) {
  return `<div class="task-item">
<label class="edit">
<i class="material-symbols-outlined"> edit </i>
${inputelement}
</label>
<p class="author"> ${author}
<span class="date">${date}</span>
</p>
</div>`;
}

function createElement(element, className) {
  return Object.assign(document.createElement(element), {
    classList: className,
  });
}

function getAuthor() {
  if (currentAuthor) {
    return currentAuthor.innerText;
  } else {
    return "";
  }
}

function getCurrentDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1);
  const day = padZero(currentDate.getDate());
  const hours = padZero(currentDate.getHours());
  const minutes = padZero(currentDate.getMinutes());
  const seconds = padZero(currentDate.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
