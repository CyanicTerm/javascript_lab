const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
  }

const multiAsyncAdd = async (...numbers) => {
    if(numbers.length === 1)
        return numbers[0];
    if(numbers.length === 2)
        return await asyncAdd(numbers[0], numbers[1])
    
    if(numbers % 2 == 0)
    {
        let dividedNumbers = numbers.splice(0, number.length / 2);
        let newNumbers;
        let halfOfNumbers = numbers;

        for (let i = 0; i < dividedNumbers.length; i++)
        {
            newNumbers.push(asyncAdd(dividedNumbers[i], halfOfNumbers[i]))
        }

        let all = await Promise.all(newNumbers);
        return await multiAsyncAdd(...all);
    }
    else
    {
        let odd = numbers.pop();
        return await asyncAdd(odd, await multiAsyncAdd(...numbers));
    }
}

let performanceBefore = performance.now();
console.log(await multiAsyncAdd(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1));
let performanceAfter = performance.now();
console.log(performanceAfter - performanceBefore);