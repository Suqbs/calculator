const calculator = document.querySelector(".innerDiv");
const keys = calculator.querySelectorAll("td input[type='button']");
console.log(calculator);
console.log(keys);

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const clickedKey = e.target;
    console.log(clickedKey);
    const action = key.dataset.action;
    console.log(typeof action);
    console.log(action);
    if (!action) {
      console.log("number key");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key!");
    }
  });
});
