const calculator = document.querySelector('.wrapper')
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');
document.addEventListener('keydown', pressKey)
buttons.addEventListener('click', pressKey)

let firstValue;
let secondValue;
let storedValue;
let storedSecond;
let operator;
let lastOperator;
let isNegative = false;

function operate(operator, firstValue, secondValue) {
  const first = Number(firstValue);
  const second = Number(secondValue);
  if(operator === 'add') return first + second;
  if(operator === 'subtract') return first - second;
  if(operator === 'multiply') return first * second;
  if(operator === 'divide') return first / second;
}

function populateDisplay(input) {
  const previousKeyType = calculator.dataset.previousKeyType
  if (display.textContent === '0' || 
  previousKeyType === 'operator' ||
  previousKeyType === 'equals') {
    display.textContent = input;
  } else {
    display.textContent += input;
  }
}

function pressKey(e) {
  if(e.target.matches('button') ||
  e.keyCode >= 48 && e.keyCode <= 57 ||  //number keys
  e.keyCode >= 96 && e.keyCode <= 111 || //numpad support
  e.key === 'Backspace' ||
  e.key === "Enter" ||
  e.key === '.' ||
  e.key === '-' ||
  e.keyCode === 187 ||                   //equals + plus
  e.keyCode === 27)                      //escape
  {
    const key = document.querySelector(`button[data-key="${e.key}"]`);
    const button = e.target;
    let action = button.value;
    if (key) action = key.value;
    const operatorBtns = calculator.querySelectorAll('.operators');
    operatorBtns.forEach(btn => btn.classList.remove('pressed'))

    if(!action && (e.keyCode >= 48 && e.keyCode <= 57 || button.className.includes('numbers'))){
      const num = e.key || button.textContent;
      populateDisplay(num);
      calculator.dataset.previousKeyType = 'number'
    }

    if(action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'){
        
        firstValue = storedValue;
        operator = lastOperator;
        secondValue = display.textContent

        if(firstValue && 
            operator &&
            calculator.dataset.previousKeyType !== 'operator' &&
            calculator.dataset.previousKeyType !== 'equals') {
            const calculatedValue = operate(operator, firstValue, secondValue);
              display.textContent = calculatedValue;
              storedValue = calculatedValue;
        } else {
          storedValue = display.textContent;
        }

        button.classList.add('pressed')
        if(key) key.classList.add('pressed')
        calculator.dataset.previousKeyType = 'operator'
        lastOperator = action;
      }

    if(action === 'decimal') {
      if(!display.textContent.includes('.')){
        display.textContent = display.textContent + '.'
      }
      if (calculator.dataset.previousKeyType === 'operator' ||
          calculator.dataset.previousKeyType === 'equals') {
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }
    
    if(action === 'negative') {
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
      if(display.textContent.length > 1)
        display.textContent = display.textContent.slice(0, -1)
      else display.textContent = 0;
    }
    
    const clear = buttons.querySelector('.btnClr')
    if(action !== 'clear') {
      clear.textContent = 'CE'
    }
    
    if(action === 'clear') {
      if(clear.textContent === 'AC') {
        firstValue = '';
        secondValue = '';
        storedValue = '';
        storedSecond = '';
        calculator.dataset.previousKeyType = ''
      } else clear.textContent = 'AC';

      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear'
    }

    if(e.key === '=' || action === 'equals') {
      firstValue = storedValue;
      operator = lastOperator;
      secondValue = display.textContent;
      if(firstValue) {
        if(calculator.dataset.previousKeyType === 'equals') {
          firstValue = display.textContent;
          secondValue = storedSecond;
        }
        display.textContent = operate(operator, firstValue, secondValue);
      }
      storedSecond = secondValue;
      calculator.dataset.previousKeyType = 'equals'
    }
  }
}