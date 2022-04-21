const calculator = document.querySelector('.wrapper')
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

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

buttons.addEventListener('click', e => {
  {
    if(e.target.matches('button')) {
      const button = e.target
      const action = e.target.value
      Array.from(button.parentNode.children)
          .forEach(btn => btn.classList.remove('pressed'))
  
      if(!action && display.textContent.length < 9){
        populateDisplay(button.textContent);
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
      
      if(action !== 'clear') {
        const clear = buttons.querySelector('.btnClr')
        clear.textContent = 'CE'
      }
      
      if(action === 'clear') {
        if(button.textContent === 'AC') {
          firstValue = '';
          secondValue = '';
          storedValue = '';
          storedSecond = '';
          calculator.dataset.previousKeyType = ''
        } else button.textContent = 'AC';

        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear'
      }
  
      if(action === 'equals') {

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
})