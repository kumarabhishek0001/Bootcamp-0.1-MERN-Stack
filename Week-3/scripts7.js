// simple concept
// we do not want certain instruction to block our code execution. Say we have a very long file to read, we do not want you program to wait till the file is read.
// so we use callbacks. Whenever a file is done reading we run a callback function that prints the content.
// Now we solved the problem of blocking code by usign a callback version where for now my thread executes the code ahead of the blocking code.
// Now see when the file is read JS does not allow the callback to interupt the code exectution.
// the callback waits in the callback queue till the execution is completed.

let count = 1;
function callbackFunc(){
    console.log(count,'setTimeout is run');
    count++;
}
setTimeout(callbackFunc,100)
setTimeout(callbackFunc,200)
setTimeout(callbackFunc,300)

let check = 0
for(let i=0; i<1000; i++){
    check = check + i;
}

console.log(check);