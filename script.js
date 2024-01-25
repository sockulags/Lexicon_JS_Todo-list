import { icons, selectors } from "./constants.js";

const addNew = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");
let currentAuthor;
addNew.addEventListener("click", () => {    
    currentAuthor = document.querySelector("option:checked");
   
    if(!currentAuthor.innerText.includes("--")){
        newTodoItem(input.value);
        input.value = "";
    } else{
        alert("Choose an author..");
    }
});

newTodoItem("Plocka äpplen");
newTodoItem("Lunch");
newTodoItem("Dricka kaffe");

attachIconListeners();
function attachIconListeners() {
    document.querySelectorAll("span").forEach((icon) =>    
    icon.addEventListener("click", (e) => {
        console.log(icon)
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
    })
  );
  document.querySelectorAll("i").forEach((edit) =>
  edit.addEventListener("click", (e) => {
    console.log(e.target.nextElementSibling);
    const taskText = e.target.nextElementSibling;
    taskText.disabled = false;    
    taskText.addEventListener("input", (key) => {
if(key.key === "Enter"){
    taskText.blur();
}else{
    taskText.style.width = (taskText.value.length + 1) * 8 + "px";
    if((taskText.value.length + 1) * 8 > 185){
        taskText.style.width = "185px";
        taskText.mul
    }
}
    })
  })
);
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

function newTodoItem(task) {
  let childElements = [];
  for (let key in selectors) {
    let currElement = createElement(
      selectors[key].element,
      selectors[key].className
    );
    switch (key) {
      case "todoCard":
        childElements.reverse();
        childElements.forEach((element) => currElement.appendChild(element));
        container.appendChild(currElement);
        break;
      case "textBox":
        childElements.forEach((element) => currElement.appendChild(element));
        childElements.length = 0;
      case "author":     
     if(currentAuthor)
             childElements.unshift(document.createTextNode("By: "+ currentAuthor.innerText+ ", "))
            currentAuthor = null;
          childElements.forEach((element) => currElement.appendChild(element));
          childElements.length = 0;
          
        break;
      case "task":
        currElement.value = task;
        currElement.disabled = true;
        currElement.style.width = (currElement.value.length + 1) * 8 + "px";
        const bla = currElement;
        currElement = createElement("label", "edit");
        currElement.innerHTML = `<i class="material-symbols-outlined">
            edit
            </i>`;
        currElement.appendChild(bla);
        break;
      case "created":
        currElement.innerText = getCurrentDateTime();
        break;
      case "icons":
        Object.values(icons).forEach(
          (icon) => (currElement.innerHTML += icon.html)
        );

        break;
      default:
    }
    childElements.unshift(currElement);
  }
  attachIconListeners();
}

function createElement(element, className) {
  return Object.assign(document.createElement(element), {
    classList: className,
  });
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
