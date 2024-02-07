const calculator = document.querySelector(".innerDiv");
const keys = calculator.querySelectorAll("td input[type='button']");

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const clickedKey = e.target;
    console.log(clickedKey);
    const action = key.dataset.action;

    switch (action) {
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        console.log("operator key");
        break;
      case "decimal":
        console.log("decimal key!");
        break;
      case "clear":
        console.log("clear key!");
        break;
      case "calculate":
        console.log("calculate key!");
        break;
      default:
        console.log("number key");
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
