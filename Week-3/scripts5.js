const a = 18;
const b = 2;

console.log(a)
console.log(b)

// there is some code that makes us wait here for 1 second
const beforeTime = Date.now();
for(let i=0; i<10000000000; i++){
    let currentTime = Date.now();
    if(currentTime - beforeTime >= 1000){
        break;
    }
}
// this sounds like it can be me made async so that I don't have to wait
// tell the os - after 1000ms call my callback function
// this is busy wait


console.log(a+b)