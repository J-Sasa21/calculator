const display = document.getElementById("display");
const history = [];

// Function to append characters to the display
function appendToDisplay(value) {
  display.value += value;
}

// Function to clear the display
function clearDisplay() {
  display.value = "";
}

// Function to calculate the result without using eval
function calculate() {
  let expression = display.value;
  let result;

  // Regular expression to match arithmetic operators
  const operators = /[+\-*/]/;

  // Split the expression into operands and operators
  const tokens = expression.split(operators);

  // Split the expression into operators
  const operatorsArray = expression.split(/\d+/).filter(Boolean);

  // Perform calculations
  try {
    result = parseFloat(tokens[0]);
    for (let i = 0; i < operatorsArray.length; i++) {
      const operator = operatorsArray[i];
      const operand = parseFloat(tokens[i + 1]);
      if (operator === "+") {
        result += operand;
      } else if (operator === "-") {
        result -= operand;
      } else if (operator === "*") {
        result *= operand;
      } else if (operator === "/") {
        if (operand === 0) {
          throw new Error("Division by zero");
        }
        result /= operand;
      }
    }
    display.value = result;
    // Store the expression and result in history
    history.push({ expression, result });
  } catch (error) {
    display.value = "Error";
  }
}

// Function to handle keyboard input
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Check if the pressed key is a digit or an operator
  if (/\d|[+\-*/.=]/.test(key)) {
    appendToDisplay(key);
  }

  // Check if the pressed key is "Enter" or "Return" for calculation
  if (key === "Enter" || key === "Return") {
    calculate();
  }

  // Check if the pressed key is "Delete" or "Backspace" for clearing the display
  if (key === "Delete" || key === "Backspace") {
    clearDisplay();
  }
});

function showHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // Clear previous history
  history.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.expression} = ${item.result}`;
    historyList.appendChild(listItem);
  });
  const modal = document.getElementById("historyModal");
  modal.style.display = "block";
}

// Function to close the history modal
function closeHistoryModal() {
  const modal = document.getElementById("historyModal");
  modal.style.display = "none";
}
