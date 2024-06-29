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
    document.querySelector("span.active").classList.remove("active");
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

/* This event listener is triggered when 
a key is released in the taskInput element */
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});

/* This event listener is triggered when the clearAll element is clicked 
 It clears all the tasks in the todos array and updates the localStorage */
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

/* showMenu is responsible for displaying 
a menu associated with a selected task.*/
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

// This function updates the status of a selected task
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  // Check if there are any tasks present
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  // Update the localStorage with the updated "todos" array
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

/* This function is used to edit a task
 It takes two parameters: taskId (the id of the task to be edited) 
 and textName (the text content of the task) */
function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

/* This function is used to delete a task
 It takes two parameters: deleteId (the id of the task to be deleted) 
 and filter (the current filter value) */
function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}
