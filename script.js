import {icons} from "./constants.js"

const addNew = document.querySelector("button");
const input = document.querySelector("input");

addNew.addEventListener("click", () => {
newTodoItem(input.value);
})

function newTodoItem(task){

}


function createElement(element, className){
    const todoItem = Object.assign(document.createElement(element), {classList: className})
    console.log(todoItem)
}

