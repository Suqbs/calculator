// Variable to store the display value
let displayField = document.getElementById("result");
displayField.value = 0;
const calc = new operate();

function operate() {
  let givenNumber = 0;
  let storedNumber = 0;

  console.log(this);

  this.methods = {
    "-": (givenNumber, storedNumber) => givenNumber - storedNumber,
    "+": (givenNumber, storedNumber) => givenNumber + storedNumber,
    "*": (givenNumber, storedNumber) => givenNumber * storedNumber,
    "/": (givenNumber, storedNumber) => givenNumber / storedNumber,
    C: (givenNumber, storedNumber) => givenNumber = 0
  };

  this.calculate = function (op) {
    givenNumber = +displayField.value;
    storedNumber = this.methods[op](givenNumber, storedNumber);
    console.log("givenNumber" + givenNumber);
    console.log("storedNumber" + storedNumber);
    return storedNumber;
  };
}

function handleOperatorClick(operator) {
  displayField.value = calc.calculate(operator);
}

const allButtons = document.querySelectorAll("td input[type='button']");

allButtons.forEach((button) => {
  if (isNumber(+button.value)) {
    console.log(button);
    button.addEventListener("click", () => handleNumberClick(button.value));
    button.addEventListener("onkeyDown", () => handleNumberClick(button.value));
  }

  //Operatörlere bastığımda algılıyor.
  if (button.value.search(/[+\-*/=C]/) != -1)
    button.addEventListener("click", () => handleOperatorClick(button.value));
});

// Function to handle clicks on number buttons
function handleNumberClick(numberButtonValue) {
  // If the current value is 0, replace it with the number
  if (displayField.value == "0") {
    displayField.value = numberButtonValue;
  } else {
    // Otherwise, append the number
    displayField.value += numberButtonValue;
  }
}

function isNumber(value) {
  return !isNaN(value); // Check if the value is not NaN (Not a Number)
}

console.log(calc);

// allButtons.forEach((button) =>
//   button.addEventListener("click", () => console.log(button))
// );
