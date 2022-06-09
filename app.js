//variables
const input = document.querySelector(".todo_input");
const addBtn = document.querySelector(".todo_btn");
const todoList = document.querySelector(".todo_list");
const todoContainer = document.querySelector(".todo_container");
// hour:minutes date/month/year
let d = new Date();
console.log(
  d.getHours() +
    ":" +
    d.getMinutes() +
    " " +
    d.getDate() +
    "/" +
    d.getMonth() +
    "/" +
    d.getFullYear().toString().substr(-2)
);

//functions
const addTodoList = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("list");

  const todoDivLeft = document.createElement("div");
  todoDivLeft.classList.add("list__left");

  const todoDivLeftInput = document.createElement("input");
  todoDivLeftInput.type = "checkbox";
  todoDivLeftInput.classList.add("todo_cbox");
  todoDivLeftInput.checked = todo.isCompleted;

  const todoDivLeftText = document.createElement("span");
  todoDivLeftText.classList.add("todo__text");
  todoDivLeftText.textContent = todo.text;

  todoDivLeft.appendChild(todoDivLeftInput);
  todoDivLeft.appendChild(todoDivLeftText);

  const todoDivRight = document.createElement("div");
  todoDivRight.classList.add("list__right");

  const todoDivRightDate = document.createElement("span");
  todoDivRightDate.classList.add("date_time");

  const todoDivRightEdit = document.createElement("span");
  todoDivRightEdit.classList.add("btn_edit");

  const todoDivRightEditI = document.createElement("i");
  todoDivRightEditI.classList.add("fa-solid");
  todoDivRightEditI.classList.add("fa-pen-to-square");

  todoDivRightEdit.appendChild(todoDivRightEditI);

  const todoDivRightDel = document.createElement("span");
  todoDivRightDel.classList.add("btn_del");

  const todoDivRightDelI = document.createElement("i");
  todoDivRightDelI.classList.add("fa-solid");
  todoDivRightDelI.classList.add("fa-trash-can");

  todoDivRightDel.appendChild(todoDivRightDelI);

  todoDivRight.appendChild(todoDivRightDate);
  todoDivRight.appendChild(todoDivRightEdit);
  todoDivRight.appendChild(todoDivRightDel);

  todoDiv.appendChild(todoDivLeft);
  todoDiv.appendChild(todoDivRight);
  todoList.appendChild(todoDiv);
  todoContainer.appendChild(todoList);
};

const starter = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addTodoList(todo);
    });
  }
};
starter();

// Add Todo Function
const addTodo = (e) => {
  e.preventDefault();

  todoText = input.value;

  const todo = {
    text: todoText,
    isCompleted: false,
  };

  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //   console.log(todos);
  addTodoList(todo);
  input.reset();
};
addBtn.addEventListener("click", addTodo);
