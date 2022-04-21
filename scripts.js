const calculator = document.querySelector('.wrapper')
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', pressButton)

let isNegative = false;
let currentValue = display.textContent;

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
  
  currentValue = Number(display.textContent);
  console.log('This is current value: ' + currentValue);
  return currentValue
}

function populateDisplay(num) {
  console.log(num);
  const previousKeyType = calculator.dataset.previousKeyType
    if (display.textContent === '0' || previousKeyType === 'operator') {
      display.textContent = num;
    } else {
      display.textContent += num;
    }
}

function clearDisplay() {
  display.textContent = 0;
  updateCurrentValue();
}

function pressButton(e) {
  const button = e.target
  const action = e.target.value

  Array.from(button.parentNode.children)
      .forEach(btn => btn.classList.remove('pressed'))

  if(button.className.includes('numbers') && display.textContent.length < 9){
    console.log('number key')
    populateDisplay(button.textContent);
    calculator.dataset.previousKeyType = 'number'
  }

  if(action === 'add' ||
     action === 'subtract' ||
     action === 'multiply' ||
     action === 'divide'){
       console.log('operator key');
       button.classList.add('pressed')
       calculator.dataset.previousKeyType = 'operator'
     }

  if(action === 'decimal') {
    console.log('decimal key');
    if(!display.textContent.includes('.')){
      display.textContent = display.textContent + '.'
    }
  }
  
  if(action === 'negative') {
    console.log('plus minus key');
    if(!isNegative && Number(display.textContent) > 0) {
      display.textContent = '-' + display.textContent
      isNegative = true;
      return
    }
    else if(isNegative) {
      display.textContent = display.textContent.substr(1);
      isNegative = false;
      return
    }
  }

  if(action === 'delete') {
    console.log('delete key');
    if(display.textContent.length > 1)
      display.textContent = display.textContent.slice(0, -1)
    else display.textContent = 0;
  }

  if(action === 'AC') {
    console.log('AC key');
    display.textContent = 0;
  }

  if(action === 'equals') {
    console.log('equals key');
  }
}