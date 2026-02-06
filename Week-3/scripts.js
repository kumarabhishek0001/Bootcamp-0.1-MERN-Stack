// normal function 
function sum(a,b){
    let result = a+b;
    return result;
}

let result = sum(1,2)
console.log(result)

// synchronus code.
// does not mean program runs up to down
// Each operation waits for the previous one to completed before moving on to the next one.

// sum of first n number
function naturalNumberSum(n){
    let ans = 0;
    for(let i=0; i<=n; i++){
        ans += i;
    }


    return ans;
}

const ans = naturalNumberSum(10);
console.log(ans);

const ans1 = naturalNumberSum(20);
console.log(ans1);


// real life backend are not always for loops or while loop or just if else
// real life backend or frontend deal with i/o operations.

// for loops are cpu heavy.
// IO operations are not IO heavy