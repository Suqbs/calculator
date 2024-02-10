const calculator = document.querySelector(".innerDiv");
const display = document.getElementById("result");
const keys = calculator.querySelectorAll("td input[type='button']");
calculator.dataset.calculateProcess = "out";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const action = key.dataset.action;
    const keyValue = key.value;
    const displayedNum = display.value;
    const previousKeyType = calculator.dataset.previousKeyType;

    keys.forEach((k) => k.classList.remove("is-depressed"));

    const calculate = (number1, operator, number2) => {
      firstValue = parseFloat(number1);
      secondValue = parseFloat(number2);
      methods = {
        add: (firstValue, secondValue) => firstValue + secondValue,
        subtract: (firstValue, secondValue) => firstValue - secondValue,
        multiply: (firstValue, secondValue) => firstValue * secondValue,
        divide: (firstValue, secondValue) => firstValue / secondValue,
      };
      const result = methods[operator](firstValue, secondValue);
      // Update both display and firstValue
      display.value = result;
      calculator.dataset.firstValue = result;
      return result;
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
        console.log(typeof calculator.dataset.calculateProcess);

        if (
          firstValue &&
          operator &&
          previousKeyType !== "operator" &&
          previousKeyType !== "calculate" &&
          calculator.dataset.calculateProcess === "out"
        ) {
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
        calculator.dataset.calculateProcess = "out";
        break;
      }
      case "decimal":
        if (!displayedNum.includes(".")) {
          display.value = displayedNum + ".";
        } else if (
          previousKeyType === "operator" ||
          previousKeyType === "calculate"
        ) {
          display.value = "0.";
        }

        calculator.dataset.previousKeyType = "decimal";
        break;
      case "clear":
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";

        display.value = 0;
        calculator.dataset.previousKeyType = "clear";
        break;
      case "calculate": {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedNum;

        if (firstValue && operator) {
          if (previousKeyType === "calculate" || calculator.dataset.calculateProcess === "in") {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
          }
          calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
        calculator.dataset.calculateProcess = "in";
        break;
      }
    }
  });
});
