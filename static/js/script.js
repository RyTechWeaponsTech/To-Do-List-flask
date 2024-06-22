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
function showTodo(filter) {
  let listTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      //logical OR operator (||) in JS
      if (filter == todo.status || filter == "all") {
        listTag += `<li class="task">
          <label for="${id}">
            <input
              onclick="updateStatus(this)"
              type="checkbox"
              id="${id}"
              ${completed}
            />
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
              <li onclick='editTask(${id}, "${todo.name}")'>
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick='deleteTask(${id}, "${filter}")'>
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </li>`;
      }
    });
  }
  // Set the innerHTML of taskBox to either listTag or message indicating no tasks
  taskBox.innerHTML =
    listTag || `<span>You don't have any task right now!</span>`;

  // Check if there are any tasks present
  let checkTask = taskBox.querySelectorAll(".task");
  if (!checkTask.length) {
    // If no tasks, remove active class from clearAll button
    clearAll.classList.remove("active");
  } else {
    // If tasks present, add active class to clearAll button
    clearAll.classList.add("active");
  }
  // Check if the height of taskBox is more than or equal to 265
  if (taskBox.offsetHeight >= 265) {
    // If height is more, add overflow class to taskBox
    taskBox.classList.add("overflow");
  } else {
    // If height is less, remove overflow from taskBox
    taskBox.classList.remove("overflow");
  }
}
// to show all the lists
showTodo("all");
