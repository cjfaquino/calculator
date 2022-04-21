const calculator = document.querySelector('.wrapper')
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', pressButton)

let firstValue;
let secondValue;
let operator;
let isNegative = false;
let currentValue = display.textContent;

function add(a, b) {
  return Number(a) + Number(b)
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

function populateDisplay(input) {
  console.log(input);
  const previousKeyType = calculator.dataset.previousKeyType
    if (display.textContent === '0' || previousKeyType === 'operator') {
      display.textContent = input;
    } else {
      display.textContent += input;
    }
}

function clearDisplay() {
  display.textContent = 0;
  updateCurrentValue();
}

function pressButton(e) {
  if(e.target.matches('button')) {
    const button = e.target
    const action = e.target.value
    Array.from(button.parentNode.children)
        .forEach(btn => btn.classList.remove('pressed'))

    if(!action && display.textContent.length < 9){
      console.log('number key')
      populateDisplay(button.textContent);
      calculator.dataset.previousKeyType = 'number'
    }

    if(action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'){
        console.log('operator key');
        
        const lastOperator = operator;
        secondValue = display.textContent

        if(firstValue && lastOperator) {
          display.textContent = operate(operator, firstValue, secondValue)
        }

        button.classList.add('pressed')
        calculator.dataset.previousKeyType = 'operator'
        firstValue = display.textContent;
        operator = action;
      }

    if(action === 'decimal') {
      console.log('decimal key');
      
      if(!display.textContent.includes('.')){
        display.textContent = display.textContent + '.'
      }
      if (calculator.dataset.previousKeyType === 'operator') {
        console.log('test');
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }
    
    if(action === 'negative') {
      console.log('plus minus key');
      if(!isNegative && Number(display.textContent) > 0) {
        display.textContent = '-' + display.textContent
        isNegative = true;
        return
      }
      else if(isNegative) {
        display.textContent = display.textContent.substring(1);
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
      secondValue = display.textContent;
      display.textContent = operate(operator, firstValue, secondValue)
    }
  }
}