function operate() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  this.calculate = function () {
    let split = str.split(" "),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };
}

const calc = new operate();

// Variable to store the display value
let displayValue = "";

// Function to handle clicks on number buttons
function handleNumberClick(number) {
  displayValue += number;
  console.log(displayValue);
  // Update the display element
  document.getElementById("result").value = displayValue;
}

const numberButtons = document.querySelectorAll("td input[type='button']");

numberButtons.forEach(button => {
  if(isNumber(+button.value)) {
    console.log(button);
    button.addEventListener("click", () => handleNumberClick(button.value));
  }
});

function isNumber(value) {
  return !isNaN(value); // Check if the value is not NaN (Not a Number)
}



