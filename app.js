//variables
const input = document.querySelector(".todo_input");
const addBtn = document.querySelector(".todo_btn");
const todoList = document.querySelector(".todo_list");
const todoContainer = document.querySelector(".todo_container");
const completedDivParent = document.querySelector(".completed_list");
console;
let delBtns;
let checkboxes;
let d = new Date(); // hour:minutes date/month/year
let btnDelCompleted;
let editBtns;
let explanation = document.querySelector(".explanation");

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
  todoDivRightDate.textContent = todo.dateTime;

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
const addCompletedList = (todo) => {
  const completedDiv = document.createElement("div");
  completedDiv.classList.add("list_completed");

  const completedDivListLeft = document.createElement("div");
  completedDivListLeft.classList.add("list__left");

  const completedDivLeftText = document.createElement("span");
  completedDivLeftText.classList.add("todo__text");
  completedDivLeftText.textContent = todo.text;
  completedDivListLeft.appendChild(completedDivLeftText);

  const completedDivRight = document.createElement("div");
  completedDivRight.classList.add("list__right");

  const completedDivRightDate = document.createElement("span");
  completedDivRightDate.classList.add("date_time");
  completedDivRightDate.textContent = todo.dateTime;

  const completedDivRightDel = document.createElement("span");
  completedDivRightDel.classList.add("btn_del_completed");

  const completedDivRightDelI = document.createElement("i");
  completedDivRightDelI.classList.add("fa-solid");
  completedDivRightDelI.classList.add("fa-trash-can");

  completedDivRightDel.appendChild(completedDivRightDelI);
  completedDivRight.appendChild(completedDivRightDate);
  completedDivRight.appendChild(completedDivRightDel);

  completedDiv.appendChild(completedDivListLeft);
  completedDiv.appendChild(completedDivRight);
  completedDivParent.appendChild(completedDiv);
};

const starter = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    // const delCompletedList = document.querySelector(".list_completed");
    // delCompletedList.innerHTML = "";
    todos.forEach((todo) => {
      if (todo.isCompleted == false) {
        addTodoList(todo);
      } else {
        addCompletedList(todo);
      }
    });
    delBtns = document.querySelectorAll(".btn_del");
    checkboxes = document.querySelectorAll(".todo_cbox");
    editBtns = document.querySelectorAll(".btn_edit");
    btnDelCompleted = document.querySelectorAll(".btn_del_completed");

    // console.log(checkboxes);
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
    dateTime:
      d.getHours() +
      ":" +
      d.getMinutes() +
      " " +
      d.getDate() +
      "/" +
      d.getMonth() +
      "/" +
      d.getFullYear().toString().substr(-2),
  };

  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //   console.log(todos);
  addTodoList(todo);
  input.value = "";
  window.location.reload();
};

// Delete Todo Function
const deleteTodo = (e) => {
  const todo = e.target.closest(".list");
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((todo) => todo.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));
  if (
    confirm("You have not completed the task, would you like to delete it?")
  ) {
    todo.remove();
  }
};

// Delete "Completed Todo" Function
const delCompleted = (e) => {
  const todo = e.target.closest(".list_completed");
  const text = todo.firstChild.children[0].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((todo) => todo.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();
  window.location.reload();
};

// Checkbox click Function. if click to convert
const cbCompleted = (e) => {
  const todo = e.target.closest(".list");
  const text = todo.firstChild.children[1].textContent;
  // console.log(text);
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    if (todo.text === text) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  console.log(todos);
  // todos.isCompleted = e.target.checked
  // console.log(e.target.checked);
  localStorage.setItem("todos", JSON.stringify(todos));
  window.location.reload();
};

//edit Todo Function
const editTodo = (e) => {
  const todo = e.target.closest(".list");
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((todo) => todo.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();
  input.value = text;
};

addBtn.addEventListener("click", addTodo);
delBtns.forEach((btn) => btn.addEventListener("click", deleteTodo));
checkboxes.forEach((btn) => btn.addEventListener("change", cbCompleted));
editBtns.forEach((btn) => btn.addEventListener("click", editTodo));
btnDelCompleted.forEach((btn) => btn.addEventListener("click", delCompleted));
if (document.querySelectorAll(".list").length > 0) {
  explanation.innerHTML = `You have ${
    document.querySelectorAll(".list").length
  } unfinished task.`;
}
explanation.innerHTML += "<br>";
if (document.querySelectorAll(".list_completed").length > 0) {
  explanation.innerHTML += `You finished ${
    document.querySelectorAll(".list_completed").length
  } task. Congratulations🎉🎉`;
}
