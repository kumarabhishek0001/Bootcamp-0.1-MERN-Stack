// TASK: WRITE A CLEAN FILE FUNCTION THAT TAKES FILE PREFIX (say 'a') AS INPUT
// AND CLEANS {prefix}1.txt, {prefix}2.txt, {prefix}3.txt
const fs = require('fs');

// comparitivly difficcult to write async function on top of sync function

function cleanFile3(filePath){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, 'UTF-8', function(err, content){
            if (err) {
                return reject(err);
            }

            content = content.trim();

            fs.writeFile(filePath, content, function(err){
                if (err) {
                    return reject(err);
                }

                return resolve('File read Complete');
            });
        });
    });
}

// approach-1
function cleanManyFiles(prefix){
    cleanFile3(prefix+'1.txt')
    .then(function(){
        console.log('1 File cleaned');
        return cleanFile3(prefix+'2.txt');
    })
    .then(function(){
        console.log('2 files cleaned');
        return cleanFile3(prefix+'2.txt');
    })
    .then(function(){
        console.log('3 Files cleaned.');
    })

}

// approach-2
function cleanManyFiles2(prefix){
    return new Promise(async function(resolve,reject){
        try{
            await cleanFile3(prefix + '1.txt')
            await cleanFile3(prefix + '2.txt')
            await cleanFile3(prefix + '3.txt')

            resolve()
        }

        catch{
            console.log('Error while performing operation');
            reject()
        }
    })
}

// easy to write  async function on top of other async function -> wohooo!! yay!! maza-agaya!!!! kya joke maraaaa~~~~
// async-awiat always return a promise
async function cleanManyFiles3(prefix){
    await cleanFile3(prefix + '1.txt')
    await cleanFile3(prefix + '2.txt')
    await cleanFile3(prefix + '3.txt')
}


cleanManyFiles2('a').then(function(){
    console.log('success')
}).catch(() => {
    console.log('Failure')
})


// promise.all, promise.race