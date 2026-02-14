const { rejects } = require('assert');
const { resolve } = require('dns');

const fs = require('fs');
// fs.readFile('./readthis.txt','utf-8',callback);



// all good this runs
function callback(content){
    

    console.log(content);
}

// error ecounterd this runs
function callbackErr(err){
    console.log('error while reading the file.');
}


// promisification
function readFilePromisified(filePath,encoding){

    return new Promise((resolve,reject) => {
        fs.readFile(filePath,encoding,(err,data) => {
            if(err){
                reject(err)
            }

            else{
                resolve(data);
            }
        })
    })
    
}

readFilePromisified("./readthis.txt","utf-8").then(callback).catch(callbackErr)






