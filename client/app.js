App = {
  contracts: {},
  init: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
    //await App.renderTasks();
  },
  init2: async () => {
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
    localStorage.setItem("account", App.account);
  },
  loadContract: async () => {
    try {
      const res = await fetch("RecordsContract.json");
      const recordsContractJSON = await res.json();
      App.contracts.RecordsContract = TruffleContract(recordsContractJSON);
      App.contracts.RecordsContract.setProvider(App.web3Provider);

      App.RecordsContract = await App.contracts.RecordsContract.deployed();
    } catch (error) {
      console.error(error);
    }
  },
  render: async () => {
    //document.getElementById("account").innerText = App.account;
    console.log("Account: " + App.account);
  },
  renderTasks: async () => {
    const recordsCounter = await App.RecordsContract.recordsCounter();
    const recordCounterNumber = recordsCounter.toNumber();

    let html = "";
    console.log("RecordsCounter: " + recordCounterNumber);
    for (let i = 1; i <= recordCounterNumber; i++) {
      const task = await App.RecordsContract.records(i);
      console.log(i);
      console.log(task);
      const taskId = task[0].toNumber();
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreatedAt = task[5];
      const taskCreatedBy = task[4];
      try {
        const cita = JSON.parse(taskDescription);
        console.log("Account actual: " + App.account);
        console.log("Account recuperada: " + taskCreatedBy);
        if (taskCreatedBy === App.account) {
          // Creating a task Card
          let taskElement = `
          <table class="table">
          <tbody>
        <tr>
          <th scope="row">${taskId}</th>
          <td>${new Date(taskCreatedAt * 1000).toLocaleString()}</td>
          <td>${cita.name}</td>
          <td>${cita.diagnostic}</td>
          <td>${cita.treatment}</td>
          <td>${cita.comments}</td>
        
          </tr>
          </tbody>
          </table>`;
          
          html += taskElement;
        }
      } catch (error) {}

      document.querySelector("#tablaUser").innerHTML = html;
    }
  },
  createRecord: async (title, description) => {
    try {
      const result = await App.RecordsContract.createRecord(
        title,
        description,
        App.account,
        {
          from: App.account,
        }
      );
      console.log(result.logs[0].args);
      window.location.reload();
      window.location.href = "/user.html";
    } catch (error) {
      console.error(error);
    }
  },
  toggleDone: async (element) => {
    const recordId = element.dataset.id;
    await App.recordsContract.toggleDone(recordId, {
      from: App.account,
    });
    window.location.reload();
  },
};
