const a = 18;
const b = 2;

console.log(a)
console.log(b)


function callback(){
    console.log(a+b);
}

// her my system is not waiting, and counting for 1second, i can move ahead do other task since time is running somewhere else. My Js thread is free to execute task be below this.
setTimeout(callback,1000)

let product = 1;
for(let i=1; i<10000; i++){
    product = product * i;
}

console.log(product^10);