const calculator = document.querySelector(".innerDiv");
const display = document.getElementById("result");
const keys = calculator.querySelectorAll("td input[type='button']");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const action = key.dataset.action;
    const keyValue = key.value;
    const displayedNum = display.value;
    const previousKeyType = calculator.dataset.previousKeyType;

    keys.forEach((k) => k.classList.remove("is-depressed"));

    const calculate = (firstValue, operator, secondValue) => {
      methods = {
        add: (firstValue, secondValue) =>
          parseFloat(firstValue) + parseFloat(secondValue),
        subtract: (firstValue, secondValue) =>
          parseFloat(firstValue) - parseFloat(secondValue),
        multiply: (firstValue, secondValue) =>
          parseFloat(firstValue) * parseFloat(secondValue),
        divide: (firstValue, secondValue) =>
          parseFloat(firstValue) / parseFloat(secondValue),
      };
      return methods[operator](firstValue, secondValue);
    };

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.value = keyValue;
      } else {
        display.value = displayedNum + keyValue;
      }
      calculator.dataset.previousKeyType = "number";
    }

    switch (action) {
      case "add":
      case "subtract":
      case "multiply":
      case "divide": {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        key.classList.add("is-depressed");

        if (firstValue && operator && previousKeyType !== "operator") {
          const calcValue = calculate(firstValue, operator, secondValue);
          display.value = calcValue;

          // Update calculated value as firstValue
          calculator.dataset.firstValue = calcValue;
        } else {
          // If there are no calculations, set displayedNum as the firstValue
          calculator.dataset.firstValue = displayedNum;
        }

        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.operator = action; // Store wanted operator
        break;
      }
      case "decimal":
        if (!displayedNum.includes(".")) {
          display.value = displayedNum + ".";
        } else if (previousKeyType === "operator") {
          display.value = "0.";
        }

        calculator.dataset.previousKeyType = "decimal";
        break;
      case "clear":
        calculator.dataset.previousKeyType = "clear";
        break;
      case "calculate":
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator) {
          display.value = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.previousKeyType = "calculate";
        break;
    }
  });
});
