const p = new Promise((resolve, reject) => resolve); //this shows pending state
console.log(p);

const fs = require('fs');

function fsReadFilePromise(fileName, encoding){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, encoding, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    });
}

// promise class ka constructor takes a function as an Input.
// the function that the constructor takes again takes two functions(resolve and reject)
// 
fsReadFilePromise('./a.txt', 'utf-8')
    .then(function(data){
        console.log(data);
    })
    .catch(function(e){
        console.log('Error while reading the file.');
        console.log(e)
    })
// ------------------------------------------------------------------------
// write promisified version of setTimeout

function setTimeoutPromisified(delay){

    return new Promise(function(resolve){
        setTimeout(function(){
            resolve()
        }, delay)
    })

}


setTimeoutPromisified(1000).then(() => {
    console.log('Ran after 1s')
})

// --------------------------------------------------------------------------------------

setTimeoutPromisified(1000)
    .then(() => {
        console.log('1s completed.');
    })
    .catch(() => {
        console.log('error ecountered');
    })
    // runs no matter what
    .finally(() => {
        console.log("runs in either condition");
    })