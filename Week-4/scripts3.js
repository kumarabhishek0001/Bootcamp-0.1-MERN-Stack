// promise class
// calling a promise is easy

// A promise in js is an object that represents the eventual completion (or failure) of an asynchronus operation and its resulting value.

// Promise can handle asynchronus operation more effectively htan traditional callback functions, providing a cleaner and more managable way to deal with code that executes asynchronusly, such as API class, file I/O or timers.

// promise 3 state -> pending, resolved and rejected

// microtask and macrotask 1:44:50


const fs = require('fs');


// this is kind of a promise (mental model) -> it represent eventual completion or failure of readFile. This is what promise also do
function callbackFn(err, content){
    console.log(content)
}

const content = fs.readFile("./readthis.txt", "utf-8", callbackFn);