var inputAmount = document.querySelector("#input-amount");
var inputCash = document.querySelector("#input-cash");
var buttonCalculate = document.querySelector("#btn-calculate");
var outputChange = document.querySelector("#output-change");

var denomination = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
inputCash.disabled = true;
buttonCalculate.disabled = true;

var change = new Map();

function calculateChange() {
  let amount = inputAmount.value;
  let cash = inputCash.value;

  validateCalculation(Number(amount), Number(cash));

  let balance = cash - amount;

  denomination.forEach((deno) => {
    if (balance > 0) {
      let noteCount = Math.floor(balance / deno);
      if (noteCount > 0) {
        change.set(deno, noteCount);
        balance = balance - deno * noteCount;
      }
    }
  });

  outputChange.innerText = displayChange(change);

  change.clear();
}

function displayChange(change) {
  let changeList = "";
  let changeHeading="Note       :       Quantity\n\n";

  change.forEach((denomination, noteCount) => {
    changeList += noteCount + "       :       " + denomination + "\n\n";
  });

  return changeHeading+changeList;
}

function checkAmountAndEnableCash() {
  let amount = inputAmount.value;
  if (isNaN(amount)) {
    inputCash.disabled = true;
    alert("Amount must be a number");
  } else {
    inputCash.disabled = false;
  }
}

function checkCash() {
  let cash = inputCash.value;
  if (isNaN(cash)) {
    buttonCalculate.disabled = true;
    alert("Amount must be a number");
  } else {
    buttonCalculate.disabled = false;
  }
}

function validateCalculation(amount, cash) {
  console.log("amount : " + amount);
  console.log("cash : " + cash);
  console.log(amount > cash);
  if (amount === cash) {
    alert("No need to pay any change");
  } else if (amount > cash) {
    alert("Cash should be more than amount to be paid");
  }
}

buttonCalculate.addEventListener("click", calculateChange);

inputAmount.addEventListener("input", checkAmountAndEnableCash);

inputCash.addEventListener("input", checkCash);
