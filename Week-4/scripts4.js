const { resolve } = require("node:dns");

function setTimeoutPromisified(ms){
    let p =  new Promise(resolve => setTimeout(resolve,ms));
    return p;
}

function callback(){
    console.log('Hi!! there');
}

setTimeoutPromisified(1000).then(callback);

/*
now promise is also a class and in that class the creator had defined a then() function

it is similar to how we created a rectangle class and created a .area() function
*/

