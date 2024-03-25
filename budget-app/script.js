let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const resetButton = document.getElementById("reset-button");
let tempAmount = 0;

totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button

const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements

const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = parseInt(balanceValue.innerText);
  let currentExpense = parseInt(expenditureValue.innerText);
  let parentAmount = parseInt(parentDiv.querySelector(".amount").innerText);

  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    // Add an event listener to "checkAmountButton" to save the edited expense
    checkAmountButton.addEventListener("click", () => {
      handleEditedExpense(parentDiv, parentAmount);
    });
  } else {
    // Original deletion logic
    currentBalance += parentAmount;
    currentExpense -= parentAmount;
    balanceValue.innerText = currentBalance;
    expenditureValue.innerText = currentExpense;
    parentDiv.remove();
  }
};

// Function to handle saving the edited expense
const handleEditedExpense = (parentDiv, originalAmount) => {
  // Get new expense details
  const newExpenseName = productTitle.value;
  const newExpenseAmount = parseInt(userAmount.value);

  // Update balances
  const newBalance = currentBalance - originalAmount + newExpenseAmount;
  const newExpense = currentExpense - originalAmount + newExpenseAmount;
  balanceValue.innerText = newBalance;
  expenditureValue.innerText = newExpense;

  // Update list item content
  parentDiv.querySelector(".product").innerText = newExpenseName;
  parentDiv.querySelector(".amount").innerText = newExpenseAmount;

  // Clear input fields and remove event listener
  productTitle.value = "";
  userAmount.value = "";
  checkAmountButton.removeEventListener("click", handleEditedExpense);
};

//Function To Create List

const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class= "product">${expenseName} </p> <p class= "amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2rem";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash", "delete");
  deleteButton.style.fontSize = "1.2rem";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });

  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

resetButton.addEventListener("click", () => {
  // Reset total amount
  tempAmount = 0;
  amount.innerHTML = tempAmount;
  
  // Reset expenditure value
  expenditureValue.innerText = 0;
  
  // Reset balance value
  balanceValue.innerText = tempAmount;
  
  // Clear list
  list.innerHTML = "";
});
