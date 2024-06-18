// variables
const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

// for connecting with ".filter span" property
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.add("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// create function to add list in class (.task-box)
function showTodo(filter) {}
