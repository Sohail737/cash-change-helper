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

  displayChange(change);

  change.clear();
}

function displayChange(change) {
  
  if (outputChange.hasChildNodes()) {
    outputChange.removeChild(outputChange.childNodes[0]);
  }
  if (change.size > 0) {
    var tbl = document.createElement("table");
    var heading = tbl.createTHead();
    var thRow = heading.insertRow(0);
    var thCellDeno = thRow.insertCell(0);
    thCellDeno.innerText = "Denomination";
    var thCellQuantity = thRow.insertCell(1);
    thCellQuantity.innerText = "Count";

    var tBody = tbl.createTBody();

    change.forEach((noteCount, denomination) => {
      var tRow = document.createElement("tr");
      var tCellDeno = tRow.insertCell(0);
      tCellDeno.innerText = "₹ "+denomination;
      var tCellQuantity = tRow.insertCell(1);
      tCellQuantity.innerText = noteCount;

      tBody.appendChild(tRow);
    });

    tbl.appendChild(tBody);

    tbl.className="output-table";
    

    outputChange.appendChild(tbl);
  }
}

function checkAmountAndEnableCash() {
  let amount = inputAmount.value;
  if (isNaN(amount)) {
    inputCash.disabled = true;
    alert("Amount must be a number");
    return;
  } else {
    inputCash.disabled = false;
  }
}

function checkCash() {
  let cash = inputCash.value;
  if (isNaN(cash)) {
    buttonCalculate.disabled = true;
    alert("Amount must be a number");
    return;
  } else {
    buttonCalculate.disabled = false;
  }
}

function validateCalculation(amount, cash) {
  console.log(amount > cash);
  if (amount === cash) {
    alert("No need to pay any change");
    return;
  } else if (amount > cash) {
    alert("Cash should be more than amount to be paid");
    return;
  }
}

buttonCalculate.addEventListener("click", calculateChange);

inputAmount.addEventListener("input", checkAmountAndEnableCash);

inputCash.addEventListener("input", checkCash);
