const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', pressButton)


let isNegative = false;
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

function populateDisplay(num) {
  console.log(num);
    if (display.value === '0') {
      display.value = num;
    } else {
      display.value += num;
    }
}

function clearDisplay() {
  display.value = 0;
  updateCurrentValue();
}

function pressButton(e) {
  const button = e.target
  const action = e.target.value

  if(button.className.includes('numbers') && display.value.length < 9){
    console.log('number key')
    populateDisplay(button.textContent);
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
    if(!isNegative && Number(display.value) > 0) {
      display.value = '-' + display.value
      isNegative = true;
      return
    }
    else if(isNegative) {
      display.value = display.value.substr(1);
      isNegative = false;
      return
    }
  }

  if(action === 'delete') {
    console.log('delete key');
    if(display.value.length > 1)
      display.value = display.value.slice(0, -1)
    else display.value = 0;
  }

  if(action === 'AC') {
    console.log('AC key');
    display.value = 0;
  }

  if(action === 'equals') {
    console.log('equals key');
  }
}