import { icons } from "./constants.js";

const addNew = document.querySelector("#addTask");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const authorCheckbox = document.querySelector("#authorNameCheckbox");
const dateCheckbox = document.querySelector("#lastAddedCheckbox");

authorCheckbox.addEventListener("change", handleCheckboxChange);
dateCheckbox.addEventListener("change", handleCheckboxChange);
addNew.addEventListener("click", handleAddTodoWithAuthorCheck);

const todoCards = [];
let currentAuthor;

// //Initialization items
// setTimeout(function() {
//   newTodoItem("Plocka äpplen");
//   setTimeout(function() {
//       newTodoItem("Lunch");
//       setTimeout(function() {
//           newTodoItem("Dricka kaffe");
//       }, 1000); // Execute after 1 second
//   }, 1000); // Execute after 1 second
// }, 1000); // Execute after 1 second
//attachIconListeners();

function handleAddTodoWithAuthorCheck() {
  currentAuthor = document.querySelector("option:checked");

  if (!currentAuthor.innerText.includes("--")) {
    newTodoItem(input.value);
    input.value = "";
  } else {
    alert("Choose an author..");
  }
}

function handleCheckboxChange(event) {
  if (event.target === dateCheckbox) {
    if (event.target.checked) {
      sortAndRenderTasks(sortByFirstAdded);
    } else {
      sortAndRenderTasks(sortByLastAdded);
    }
  } else if (event.target === authorCheckbox) {
    if (event.target.checked) {
      sortAndRenderTasks(sortByAuthorAscending);
    } else {
      sortAndRenderTasks(sortByAuthorDescending);
    }
  }
}

function handleSpanClick(e) {
  const todoItem = e.target.closest(".todo-item");
  switch (e.target.id) {
    case "upArrow":
      tryMove(todoItem, "up");
      break;
    case "downArrow":
      tryMove(todoItem, "down");
      break;
    case "delete":
      deleteItem(todoItem);
      break;
    case "done":
      todoItem.querySelector(".task").classList.toggle("completed-task");
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

// Sorting functions
function sortAndRenderTasks(sortFunction) {
  todoCards.sort(sortFunction);
  renderTasks();
}
function renderTasks() {
  todoCards.forEach((todoTask) => container.appendChild(todoTask.card));
  attachIconListeners();
}

function sortByFirstAdded(a, b) {
  return new Date(a.date) - new Date(b.date);
}
function sortByLastAdded(a, b) {
  return new Date(b.date) - new Date(a.date);
}
function sortByAuthorAscending(a, b) {
  return a.author.localeCompare(b.author);
}
function sortByAuthorDescending(a, b) {
  return b.author.localeCompare(a.author);
}

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

function deleteItem(todoItem) {
  todoItem.remove();
  const indexToRemove = todoCards.findIndex(
    (todoTask) => todoTask.card === todoItem
  );
  todoCards.splice(indexToRemove, 1);
}

function tryMove(element, direction) {
  const adjacentElement =
    direction === "up"
      ? element.previousElementSibling
      : element.nextElementSibling;
  if (adjacentElement && adjacentElement.classList.contains("todo-item")) {
    if (direction === "up") {
      element.parentNode.insertBefore(element, adjacentElement);
    } else {
      element.parentNode.insertBefore(adjacentElement, element);
    }
  }
}

function newTodoItem(text) {
  const taskElement = createElement("input", "task");
  taskElement.setAttribute("disabled", true);

  const todoItemContainer = createElement("div", "todo-item");

  const currDate = getCurrentDateTime();
  const currAuthor = getAuthor();

  todoItemContainer.innerHTML = todoCard(
    taskElement.outerHTML,
    currAuthor,
    currDate
  );

  const iconsDiv = createElement("div", "icons");
  Object.values(icons).forEach((icon) => {
    iconsDiv.innerHTML += icon.html;
  });

  const taskText = todoItemContainer.querySelector("input");
  taskText.value = text;
  taskText.style.width = getInputWidth(taskText.value.length);
  todoItemContainer.appendChild(iconsDiv);

  const todoTask = {
    card: todoItemContainer,
    author: currAuthor,
    date: currDate,
  };
  todoCards.push(todoTask);

  container.appendChild(todoItemContainer);
  attachIconListeners();
}

function createElement(element, className) {
  return Object.assign(document.createElement(element), {
    classList: className,
  });
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

function getInputWidth(length) {
  let width = (length + 1) * 8;
  return width > 185 ? "185px" : `${width}px`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
