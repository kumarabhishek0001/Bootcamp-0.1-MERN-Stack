// i want to do an operation that applies on every elemnt of an array
// say i have an array [1,2,3,4,5];
// now what i want is simple double every element => [2,4,6,8,10];


// method: 1

let arr1 = [1,2,3,4,5];
let outArr1 = [];
let n = arr1.length


for(let i=0; i<n; i++){
    let x = arr1[i];

    outArr1.push(x*2);
}

console.log(outArr1)


// method-2: using map
// it is called on the array i am trying to do oepraton on. It takes another function as an argument, this function tells what to do on the array

function transform(i){
    return i*3;
}
let outArr2 = arr1.map(transform);
console.log(outArr2);

// using map by passing an arrow function
let outArr3 = arr1.map((i) => i*4);
console.log(outArr3)

