const display = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators')

numbers.forEach(button => button.addEventListener('click', populateDisplay))
operators.forEach(button => button.addEventListener('click', useOperators))
display.addEventListener('input', updateCurrentValue)

let currentValue = display.value;

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a ,b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, currentValue, nextValue) {
  if(operator === 'add') return add(currentValue, nextValue);
  if(operator === 'subtract') return subtract(currentValue, nextValue);
  if(operator === 'multiply') return multiply(currentValue, nextValue);
  if(operator === 'divide') return divide(currentValue, nextValue);
}

function updateCurrentValue() {
  currentValue = display.value;
  console.log(currentValue);
}

function populateDisplay() {
    if(display.value === '0') display.value = this.textContent
    else display.value += this.textContent;
    updateCurrentValue();
}

function clearDisplay() {
  display.value = 0;
  updateCurrentValue();
}

function useOperators() {
  if(this.value === 'AC') clearDisplay();
  console.log(this.value);
}