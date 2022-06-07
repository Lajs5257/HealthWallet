App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    await App.renderTasks();
  },
  loadWeb3: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "No ethereum browser is installed. Try it installing MetaMask "
      );
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },
  loadContract: async () => {
    try {
      const res = await fetch("TasksContract.json");
      const tasksContractJSON = await res.json();
      App.contracts.TasksContract = TruffleContract(tasksContractJSON);
      App.contracts.TasksContract.setProvider(App.web3Provider);

      App.tasksContract = await App.contracts.TasksContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    document.getElementById("account").innerText = App.account;
    console.log("Account: " + App.account);
  },
  renderTasks: async () => {
    const tasksCounter = await App.tasksContract.tasksCounter();
    const taskCounterNumber = tasksCounter.toNumber();

    let html = "";

    for (let i = 1; i <= taskCounterNumber; i++) {
      const task = await App.tasksContract.tasks(i);
      const taskId = task[0].toNumber();
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreatedAt = task[5];
      const taskCreatedBy = task[4];
      console.log("Account actual: " + App.account);
      console.log("Account recuperada: " + taskCreatedBy);
      if (taskCreatedBy === App.account) {
        // Creating a task Card
        let taskElement = `<div class="card bg-dark rounded-0 mb-2">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>${taskTitle}</span>
          <div class="form-check form-switch">
            <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${
          taskDone === true && "checked"
        }>
          </div>
        </div>
        <div class="card-body">
          <span>${taskDescription}</span>
          <span>${taskDone}</span>
          <p class="text-muted">Task was created ${new Date(
            taskCreatedAt * 1000
          ).toLocaleString()}</p>
          </label>
        </div>
      </div>`;
        html += taskElement;
      }
      if (taskCreatedBy === App.account && taskTitle === "person") {
        document.querySelector("#tasksList").innerHTML = html;
        setTimeout(function(){ 
          if (person) {
            console.log(document.getElementById("#name"));
            // document.getElementById("#name").textContent = person.name || "";
            // document.getElementById("#lastName").innerHTML = person.lastName;
            // document.getElementById("#day").textContent = person.day;
            taskPerson["month"].textContent = person.month;
            taskPerson["year"].textContent = person.year;
            taskPerson["sex"].textContent = person.sex;
            taskPerson["email"].textContent = person.email;
            taskPerson["country"].textContent = person.country;
            taskPerson["weight"].textContent = person.privateData.weight;
            taskPerson["height"].textContent = person.privateData.height;
            taskPerson["blood"].textContent = person.privateData.blood;
          }    
        }, 3000 )
        const person = JSON.parse(taskDescription);
        console.log(person);
        console.log(person.name);
        const taskPerson = document.querySelector("#formPerson");
        console.log(taskPerson);
        
      }
    }
    
  },
  createTask: async (title, description) => {
    try {
      const result = await App.tasksContract.createTask(
        title,
        description,
        App.account,
        {
          from: App.account,
        }
      );
      console.log(result.logs[0].args);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  toggleDone: async (element) => {
    const taskId = element.dataset.id;
    await App.tasksContract.toggleDone(taskId, {
      from: App.account,
    });
    window.location.reload();
  },
};
