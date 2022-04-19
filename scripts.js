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