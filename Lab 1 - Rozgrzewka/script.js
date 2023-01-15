const addBtn = document.querySelector('#addBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const calculateBtn = document.querySelector('#calculateBtn');
const inputNum = document.querySelector('#inputNum');
const sum = document.querySelector('#sum');
const average = document.querySelector('#average');
const max = document.querySelector('#max');
const min = document.querySelector('#min');

addBtn.addEventListener('click', () => {
    let newInput = document.createElement('input');
    newInput.className = 'w-25 form-control';
    newInput.type = 'text';
    inputNum.appendChild(newInput);
})

deleteBtn.addEventListener('click', () => {
    const numbers = document.querySelectorAll('.w-25');
    numbers.forEach(element => {
        element.value.length <= 0 && element.remove();  
    })
})

calculateBtn.addEventListener('click', () => {
    let sumResult = 0;
    const numbers = document.querySelectorAll('.w-25');
    console.log(numbers);
    numbers.forEach(element => {
        sumResult += parseInt(element.value);
    })
    result.textContent = `Wynik: ${sumResult}`;
})

inputNum.addEventListener('change', () => {
    let sumResult = 0;
    let sumHelper;
    const numbers = document.querySelectorAll('.w-25');
    const mapped = Array.from(numbers).map(element => element.value);
    let minNumber = Math.min(...mapped);
    let maxNumber = Math.max(...mapped);

    mapped.forEach(element => {
        sumHelper = sumResult;
        sumResult += parseInt(element);
        
        if(isNaN(sumResult)) {
            sumResult = sumHelper;
        } 
    })
    sum.textContent = `Sum: ${sumResult}`;
    average.textContent = `Average: ${sumResult / mapped.length}`;
    max.textContent = `Largest number: ${maxNumber}`;
    min.textContent = `Lowest number: ${minNumber}`;
})


