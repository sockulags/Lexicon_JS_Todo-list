export const icons = {  
  upArrow: {
    node: document.querySelector(".upArrow"),
    html: `<span id="upArrow" class="material-symbols-outlined">
            arrow_upward
        </span>`,
  },
  downArrow: {
    node: document.querySelector(".downArrow"),
    html: `<span id="downArrow" class="material-symbols-outlined">
            arrow_downward
        </span>`,
  },
  delete: {
    node: document.querySelector(".delete"),
    html: `<span id="delete" class="material-symbols-outlined">
            delete
        </span>`,
  },
  done: {
    node: document.querySelector(".done"),
    html: `<span id="done" class="material-symbols-outlined">
            assignment_turned_in
        </span>`,
  },
};

export const selectors = {
  created: {
    element: "span",
    className: "date",
  },
  author: {
    element: "p",
    className: "author",
  },
  task: {
    element: "input",
    className: "task",
  },
  textBox: {
    element: "div",
    className: "task-item",
  },
  icons: {
    element: "div",
    className: "icons",
  },
  todoCard: {
    element: "div",
    className: "todo-item",
  },
};
