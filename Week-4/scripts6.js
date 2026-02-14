// callback hell

setTimeout(function(){

    console.log('hello in 1s');
    setTimeout(function(){
        
        console.log('Hii in 3s');
        setTimeout(function(){

            console.log('Hii in 5s')
        }, 5000);
    }, 3000);
},1000);


// callback hell can be avoided and promises also can cause the same problem but in interviews
// it is an answer to avoid callback hell we use promises

// same implementation without callback hell

function step3(){
    console.log('Hii in 5s');
}

function step2(){
    console.log('Hii in 3s');
    setTimeout(step3, 5000)
}

function step1(){
    console.log('Hii in 1s');
    setTimeout(step2, 3000)
}


setTimeout(step1, 1000);

// 