window.addEventListener("load", () => {
  //
});
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

//variables
const input = document.querySelector(".todo_input");
const addBtn = document.querySelector(".todo_btn");

//functions
const todofunction = (e) => {
  e.preventDefault();

  //   console.log(input.value);
};

addBtn.addEventListener("click", todofunction);
