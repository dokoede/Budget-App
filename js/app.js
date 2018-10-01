// Classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }
  substractFromBudget(amount) {
    return (this.budgetLeft -= amount);
  }
}

class HTML {
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
  }
  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));
    document
      .querySelector(".primary")
      .insertBefore(messageWrapper, addExpenseForm);

    setTimeout(function() {
      document.querySelector(".primary .alert").remove();
      addExpenseForm.reset();
    }, 3000);
  }

  addExpenseToList(name, amount) {
    const expenseList = document.querySelector("#expenses ul");

    const li = document.createElement("li");
    li.className =
      " list-group-item d-flex justify-content-betweeen align-items-center";
    li.innerHTML = `${name} <span class="badge badge-primary badge-pill">${amount}</span>`;
    expenseList.appendChild(li);
  }

  trackBudget(amount) {
    const budgetLeftDollars = budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;

    if (budgetLeftDollars < budget.budget / 4) {
      budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
      budgetLeft.parentElement.parentElement.classList.add("alert-danger");
    } else if (budgetLeftDollars < budget.budget / 2) {
      budgetLeft.parentElement.parentElement.classList.remove("alert-success");

      budgetLeft.parentElement.parentElement.classList.add("alert-warning");
    }
  }
}
// variables

const addExpenseForm = document.querySelector("#add-expense"),
  budgetTotal = document.querySelector("span#total"),
  budgetLeft = document.querySelector("span#left");
let budget, userBudget;
const html = new HTML();

// Event Listener
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", function() {
    userBudget = prompt("Please enter your budget for the week");
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);

      html.insertBudget(budget.budget);
    }
  });

  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const expenseName = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;
    if (expenseName === "" || amount === "") {
      html.printMessage(" Complete empty fields", "alert-danger");
    } else {
      html.addExpenseToList(expenseName, amount);
      html.trackBudget(amount);
      html.printMessage(" Expense Added", "alert-success");
    }
  });
}
