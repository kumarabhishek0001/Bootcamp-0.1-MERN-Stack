const fs = require('fs')

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

async function main(){
    const readOperation1 = await fsReadFilePromise('./a.txt', 'UTF-8');
    const readOperation2 = await fsReadFilePromise('./b.txt', 'UTF-8');
    const readOperation3 = await fsReadFilePromise('./c.txt', 'UTF-8');

    console.log(readOperation1);
    console.log(readOperation2);
    console.log(readOperation3);
}

console.log('check1'); //1. this runs as it should

main();

console.log('check2'); // 2. This runs just after 1. OK, the reason is main is asynchronus so while it is reading check2 is run 