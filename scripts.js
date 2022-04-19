const display = document.getElementById('display');
let currentValue = display.value;
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', populateDisplay))

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
  if(operator === add) return add(currentValue, nextValue);
  if(operator === subtract) return subtract(currentValue, nextValue);
  if(operator === multiply) return multiply(currentValue, nextValue);
  if(operator === divide) return divide(currentValue, nextValue);
}

function populateDisplay() {
  if(this.textContent === '0' || Number(this.textContent)) {
    if(display.value === '0') display.value = this.textContent
    else display.value += this.textContent
  };
  if(this.textContent === 'AC') clearDisplay();
}

function clearDisplay() {
  display.value = 0;
}