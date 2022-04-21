const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', pressButton)


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
  currentValue = Number(display.value);
  console.log('This is current value: ' + currentValue);
  return currentValue
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

function pressButton(e) {
  const button = e.target
  const action = e.target.value

  if(button.className.includes('numbers')){
    console.log('number key')
  }

  if(action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide'){
       console.log('operator key');
     }

  if(action === 'decimal') {
    console.log('decimal key');
  }
  if(action === 'negative') {
    console.log('plus minus key');
  }
  if(action === 'delete') {
    console.log('delete key');
  }
  if(action === 'AC') {
    console.log('AC key');
  }
  if(action === 'equals') {
    console.log('equals key');
  }
}