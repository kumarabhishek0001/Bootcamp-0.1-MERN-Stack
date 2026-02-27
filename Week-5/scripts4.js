// writing a synchronus function
const fs = require('fs');

function cleanFile(filePath){
    let contents = fs.readFileSync(filePath, 'utf-8');
    contents = contents.trim();

    fs.writeFileSync(filePath,contents);
}


// writing asynchornusly using callbacks
function cleanFile2(filePath,encoding, cb){
    fs.readFile(filePath,encoding,function(err,content){
        if(err){
            console.log('FAILED: error while reading the file');
        }
        else{
            console.log('SUCCESS: File reading complete');
            content = content.trim();
            // console.log(content);

            fs.writeFile(filePath,content, function(err){
                if(err){
                    console.log('FAILED: error while reading the file')

                }
                else{
                    cb()
                }
            });
        }
    })
}


// writing asynchronously using promise

function cleanFile3(filePath, encoding){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, encoding, function(err, content){
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


// cleanFile3('./k.txt', 'utf-8').then(() => {console.log('SUCCESS')}).catch(() => {console.log('FAILED')});


// using async-await
// await cannot be used stand alone-> top level await error.
// when using then,catch syntax we handled error using catch, however here we are not handling it propertly
// to handle it properly make use of try catch
async function cleanMultipleFiles() {
    try {
        await cleanFile3('./a.txt', 'utf-8')
        console.log('Completed task')
    } catch (error) {
        console.log('Some error occured.')
        console.log(error)
    }
}

cleanMultipleFiles()


