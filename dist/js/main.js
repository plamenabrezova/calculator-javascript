const NUM_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS_KEYS = ["+", "-", "*", "/"];
const EQUAL_KEYS = ["=", "Enter"];
const MAX_DIGIT_COUNT = 8;

const performMathOperation = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;

    case "-":
      return firstNumber - secondNumber;

    case "*":
      return firstNumber * secondNumber;

    case "/":
      if (secondNumber === 0) {
        return "Cannot divide by zero";
      }
      return firstNumber / secondNumber;
  }
};

let upperLine;
let lowerLine

let firstNumber;
let secondNumber;
let operator = "";

const initApp = () => {
  // initial calculator values
  upperLine = document.querySelector(".upper-line");
  lowerLine = document.querySelector(".lower-line");
  firstNumber = parseFloat(lowerLine.innerText);

  handleKeyDownActions();
  handleDigitClick();
  handleOperatorClick();
  handleEqualClick();
  handleClearLine();
  handleClearEverything();
  handleLastDigitDeletion();
  handleChangeSignOperation();
  handleDecimalPointAddition();
};

const handleKeyDownActions = () => {
  document.addEventListener("keydown", (event) => {
    if (NUM_KEYS.includes(event.key)) {
      selectDigit(event.key);
    } else if (OPERATORS_KEYS.includes(event.key)) {
      selectOperator(event.key);
    } else if (EQUAL_KEYS.includes(event.key)) {
      performEqualCalculation();
    }
  });
};

const handleDigitClick = () => {
  const numBtns = document.querySelectorAll(".num");
  numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
      selectDigit(numBtn.innerText);
    });
  });
};

const selectDigit = (digitSelected) => {
  if (
    parseFloat(lowerLine.innerText) === firstNumber ||
    upperLine.innerText.endsWith("=")
  ) {
    lowerLine.innerText = digitSelected;
    if (upperLine.innerText.endsWith("=")) {
      upperLine.innerText = "";
    }
  } else {
    if (lowerLine.innerText.length < MAX_DIGIT_COUNT) {
        lowerLine.innerText += digitSelected;
    }
    
  }
};

const handleOperatorClick = () => {
  const operatorBtns = document.querySelectorAll(".operator");
  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", () => {
      selectOperator(operatorBtn.innerText);
    });
  });
};

const selectOperator = (operatorSelected) => {
  if (operator === "") {
    firstNumber = parseFloat(lowerLine.innerText);
    upperLine.innerText = lowerLine.innerText + operatorSelected;
    lowerLine.innerText = firstNumber.toString();
  } else {
    if (
      !upperLine.innerText.endsWith("=") &&
      firstNumber !== parseFloat(lowerLine.innerText)
    ) {
      secondNumber = parseFloat(lowerLine.innerText);
      firstNumber = performMathOperation(
        firstNumber,
        secondNumber,
        operator
      );

      upperLine.innerText = firstNumber;
      upperLine.innerText += operator;
      lowerLine.innerText = firstNumber;
    } else {
      secondNumber = firstNumber;
      upperLine.innerText = firstNumber + operatorSelected;
    }
  }
  operator = operatorSelected;
};

const handleEqualClick = () => {
  const equalBtn = document.querySelector(".equal");
  equalBtn.addEventListener("click", () => {
    performEqualCalculation();
  });
};

const performEqualCalculation = () => {
  if (operator === "") {
    firstNumber = parseFloat(lowerLine.innerText);
    upperLine.innerText = lowerLine.innerText + "=";
    lowerLine.innerText = firstNumber.toString();
  } else {
    if (!secondNumber || firstNumber !== parseFloat(lowerLine.innerText)) {
      secondNumber = parseFloat(lowerLine.innerText);
    }

    lowerLine.innerText = performMathOperation(
      firstNumber,
      secondNumber,
      operator
    );

    upperLine.innerText =
      firstNumber.toString() + operator + secondNumber.toString() + "=";
    firstNumber = parseFloat(lowerLine.innerText);
  }
};

const handleClearEverything = () => {
  const clearBtn = document.querySelector(".clear-all");
  clearBtn.addEventListener("click", () => {
    resetUpperLine();
    resetLowerLine();
    operator = "";
  });
};

const handleClearLine = () => {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    resetLowerLine();
  });
};

const resetLowerLine = () => {
  lowerLine.innerText = "0";
  firstNumber = parseFloat(lowerLine.innerText);
};

const resetUpperLine = () => {
  upperLine.innerText = "";
  secondNumber = null;
};

const handleLastDigitDeletion = () => {
  const delBtn = document.querySelector(".del");
  delBtn.addEventListener("click", () => {
    if (lowerLine.innerText.length === 1) {
      resetLowerLine();
    } else {
      lowerLine.innerText = lowerLine.innerText.slice(
        0,
        lowerLine.innerText.length - 1
      );
    }
  });
};

const handleChangeSignOperation = () => {
  const changeSignBtn = document.querySelector(".change-sign");
  changeSignBtn.addEventListener("click", () => {
    if (lowerLine.innerText !== "0") {
      if (lowerLine.innerText.startsWith("-")) {
        lowerLine.innerText = lowerLine.innerText.slice(1);
      } else {
        lowerLine.innerText = "-" + lowerLine.innerText;
      }
    }
  });
};

const handleDecimalPointAddition = () => {
  const decimalPointBtn = document.querySelector(".decimal-point");
  decimalPointBtn.addEventListener("click", () => {
    if (!lowerLine.innerText.includes(".")) {
      lowerLine.innerText = lowerLine.innerText + ".";
    }
  });
};

document.addEventListener("DOMContentLoaded", initApp);
