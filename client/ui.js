document.addEventListener("DOMContentLoaded", () => {
  //App.init();
});

const pagina = document.querySelector("#pagina");
console.log(pagina.title);
if (pagina.title === "index") {
  console.log("hola");
  const login = document.querySelector("#login");
  login.addEventListener("submit", (e) => {
    e.preventDefault();
    App.init();
    location.replace("/Doctor.html");
  });
} else if (pagina.title === "doctor") {
  console.log("hola");

  // login.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   App.init();
  //   location.replace('/Doctor.html');
  // });
} else if (pagina.title === "user") {
  //console.log("hola");
  App.init2();
  //console.log("holsdfsdfasa");
  // login.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   App.init();
  //   location.replace('/Doctor.html');

  // });
} else if (pagina.title === "add") {
  console.log("holasefds");
  App.init();
  const boton = document.querySelector("#addConsult");
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = "person";
    const person = {
      name: document.getElementById("exampleInputName").value,
      diagnostic: document.getElementById("diagnostic").value,
      day: document.getElementById("exampleInputDateDay").value,
      month: document.getElementById("exampleInputDateMonth").value,
      year: document.getElementById("exampleInputDateYear").value,
      treatment: document.getElementById("treatment").value,
      comments: document.getElementById("comments").value,
    };
    console.log(person);
    const description = JSON.stringify(person);
    const createdBy = localStorage.getItem("account");
    console.log("datos  " + title + "  " + description + "  " + createdBy);
    App.createRecord(title, description, createdBy);
    //location.replace("/User.html");
  });
}
