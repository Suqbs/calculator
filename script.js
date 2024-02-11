const calculator = document.querySelector(".innerDiv");
const display = document.getElementById("result");
const keys = calculator.querySelectorAll("td input[type='button']");
calculator.dataset.calculateProcess = "out";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    if (display.value === "Invalid input" || display.value === "Overflow" || display.value === "Approaching Zero") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
      display.value = "0";
    }

    const action = key.dataset.action;
    const keyValue = key.value;
    const displayedNum = display.value;
    const previousKeyType = calculator.dataset.previousKeyType;

    console.log(display.value.length);
    keys.forEach((k) => k.classList.remove("is-depressed"));

    const calculate = (number1, operator, number2) => {
      firstValue = parseFloat(number1);
      secondValue = parseFloat(number2);
      methods = {
        add: (firstValue, secondValue) => firstValue + secondValue,
        subtract: (firstValue, secondValue) => firstValue - secondValue,
        multiply: (firstValue, secondValue) => firstValue * secondValue,
        divide: (firstValue, secondValue) => {
          // if(Math.abs(firstValue) > 1.2e-321)
          // {
          //   return "Approaching 0";
          // }

          if (secondValue === 0) {
            return "Divided By Zero";
          } else {
            // if((firstValue / secondValue) < Number.MIN_VALUE && (firstValue / secondValue) > 0) return "Approaching Zero"
            return firstValue / secondValue;
          }
        },
      };

      let result = methods[operator](firstValue, secondValue);
      const stringResult = result.toString();

      if (result >= Number.MAX_VALUE) return "Overflow";
      if (result < Number.MAX_VALUE) {
        if (result > Math.pow(10, 12)) result = result.toExponential("8");
        else if (stringResult.includes("e") && (stringResult > 0 && stringResult < 1) || (stringResult < 0 && stringResult > -1))
        {
          result = result.toExponential("8");
        }
        else if (stringResult.includes(".") && stringResult.length >= 14) {
          result = result.toFixed(14 - (stringResult.indexOf(".") + 1));
        }
      }
      return result;
    };

    if (!action) {
      if (display.value.length < 14 || previousKeyType !== "number")
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

        display.value = "0";
        calculator.dataset.previousKeyType = "clear";
        break;
      case "calculate": {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedNum;

        if (firstValue && operator) {
          if (
            previousKeyType === "calculate" ||
            calculator.dataset.calculateProcess === "in"
          ) {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
          }
          display.value = calculator.dataset.firstValue = calculate(
            firstValue,
            operator,
            secondValue
          );
        }
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
        calculator.dataset.calculateProcess = "in";
        break;
      }
    }
  });
});
