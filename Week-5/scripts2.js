const fs = require('fs');

function fsReadFilePromise(filePath, encoding){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, encoding, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

fsReadFilePromise('./a.txt', 'UTF-8')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('Operation Finished!!');
    })