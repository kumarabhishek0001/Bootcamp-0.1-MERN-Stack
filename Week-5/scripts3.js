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
    // here intentionally I am not using await so the log is pending
    // now the important thing here is if i don't use await here the fsreadfilepromise instantly returns my promise which results in it showing pending
    // now if we use await it the thread continues ahead and waht for it to either resolve or reject.
    const readOperation1 =     await fsReadFilePromise('./a.txt', 'UTF-8');
    const readOperation2 =     await fsReadFilePromise('./b.txt', 'UTF-8');
    const readOperation3 =     await fsReadFilePromise('./c.txt', 'UTF-8');

    console.log(readOperation1);
    console.log(readOperation2);
    console.log(readOperation3);
}

console.log('check1'); //1. this runs as it should

main();

console.log('check2'); // 2. This runs just after 1. OK, the reason is main is asynchronus so while it is reading check2 is run 


// async await is just a syntactical sugar for then, catch, finally
    // const readOperation1 =     fsReadFilePromise('./a.txt', 'UTF-8');
    // const readOperation2 =     await fsReadFilePromise('./b.txt', 'UTF-8');
    // const readOperation3 =     await fsReadFilePromise('./c.txt', 'UTF-8');

// now this prints some other result
// this is because await creates a delay for 2nd operation this delay,
// now even if the delay for 2nd yet the first promise get's enough time to get resolved
// the promise does not return proper formart as 2nd and 3rd due to the reason that async await is syntactical sugar for then catch
// since it is not there we don't get a resolved value.