
const fs = require('fs');

// callback => jab file read ho jae to isse run kardena
// all good -> contents
// error first callback -> err
function fileReadCallback(err, contents){
    
    console.log(contents);

}

// jab file read ho jaegi to fileReadCallback invoke ho jaega
fs.readFile("./a.txt","utf-8",fileReadCallback);

// callback will never interrupt the code ahead. Once the code is exected only then the callbacks are invoked.
for(let i=0; i<=10; i++){
    console.log(i);
}
