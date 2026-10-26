const display = document.getElementById("display"); // element to display the current input and result
const buttons = document.getElementById("buttons"); // element containing all the calculator buttons
let currentInput = ""; // current input for the calculator

function appendNumber(number) {
  currentInput += number; // append the number to the current input
  display.value = currentInput; // update the display with the current input
} // function to append a number to the current input and update the display

function appendOperator(operator) {
  currentInput += operator; // append the operator to the current input
  display.value = currentInput; // update the display with the current input
} // function to append an operator to the current input and update the display

function clearDisplay() {
  // function to clear the display and reset the current input
  currentInput = ""; // reset the current input
  display.value = currentInput;
} // function to clear the display and reset the current input

function calculate() {
  try {
    // try to evaluate the current input and calculate the result
    currentInput = eval(currentInput).toString();
    display.value = currentInput; // update the display with the calculated result
  } catch (error) {
    // handle any errors that occur during calculation
    display.value = "Error"; // display an error message if calculation fails
    currentInput = ""; // reset the current input after an error
  }
} // function to calculate the result of the current input and update the display
