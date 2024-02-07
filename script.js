const calculator = document.querySelector(".innerDiv");
const display = document.getElementById("result");
const keys = calculator.querySelectorAll("td input[type='button']");

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const clickedKey = e.target;
    const action = key.dataset.action;
    const keyValue = clickedKey.value;
    const displayedNum = display.value;
    console.log(keyValue);
    console.log(displayedNum);

    if (!action) {
      if (displayedNum === "0") {
        display.value = keyValue;
      } else {
        display.value = displayedNum + keyValue;
      }
    }

    switch (action) {
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        console.log("operator key");
        break;
      case "decimal":
        console.log("decimal key!");
        display.value = displayedNum + ".";
        break;
      case "clear":
        console.log("clear key!");
        break;
      case "calculate":
        console.log("calculate key!");
        break;
    }
    // if (
    //   action === "add" ||
    //   action === "subtract" ||
    //   action === "multiply" ||
    //   action === "divide"
    // ) {
    //   console.log("operator key!");
    // }
  });
});
