document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Task form
 */
const taskForm = document.querySelector("#taskForm");
const account = document.querySelector("#account");
const taskPerson = document.querySelector("#formPerson");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["title"].value;
  const description = taskForm["description"].value;
  const createdBy = account.value;
  console.log("datos  " + title + "  " + description + "  " + createdBy);
  App.createTask(title, description, createdBy);
});

taskPerson.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = "person";
  const person = {
    name: taskPerson["name"].value,
    lastName: taskPerson["lastName"].value,
    day: taskPerson["day"].value,
    month: taskPerson["month"].value,
    year: taskPerson["year"].value,
    sex: taskPerson["sex"].value,
    email: taskPerson["email"].value,
    country: taskPerson["country"].value,
    privateData:{
      weight:taskPerson["weight"].value,
      height:taskPerson["height"].value,
      blood:taskPerson["blood"].value,
    }
  };

  const description = JSON.stringify(person);
  const createdBy = account.value;
  console.log("datos  " + title + "  " + description + "  " + createdBy);
  App.createTask(title, description, createdBy);
});
