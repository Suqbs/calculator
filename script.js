// Variable to store the display value
let displayField = document.getElementById("result");
displayField.value = 0;
const calc = new operate();

function operate(displayValue) {
  const number1 = displayValue;
  const number2 = 0;

  console.log(this);

  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    C: () => {},
  };
  // if (!this.methods[op] || isNaN(a) || isNaN(b)) {
  //   console.log(this);
  //   return NaN;
  // }

  // return this.methods[op](a, b);
}

// Function to handle clicks on number buttons
function handleNumberClick(number) {
  // If the current value is 0, replace it with the number
  if (displayField.value == "0") {
    displayField.value = number;
  } else 
  {
    // Otherwise, append the number
    displayField.value += number;
  }
}

function handleOperatorClick(button) {
  console.log("oldu");
}

const allButtons = document.querySelectorAll("td input[type='button']");

allButtons.forEach((button) => {
  if (isNumber(+button.value)) {
    console.log(button);
    button.addEventListener("click", () => handleNumberClick(button.value));
  }

  if (button.value.search(/[+\-*/=C]/) != -1)
    button.addEventListener("click", () => handleOperatorClick(button.value));
});

allButtons.forEach(button => button.addEventListener("click", () => console.log(button)));

function isNumber(value) {
  return !isNaN(value); // Check if the value is not NaN (Not a Number)
}

console.log(calc);
