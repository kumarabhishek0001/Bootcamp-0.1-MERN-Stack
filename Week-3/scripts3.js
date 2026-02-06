// functional arguments
//  in js functions are like first class citizens meaning variable and functions have a same status
function sum(a,b){
    return a+b;
}

function sub(a,b){
    return a-b
}

// mathod-1
// function doArithmatic(a,b,whatToDo){

//     if(whatToDo === "sum") return sum(a,b);
//     if(whatToDo === 'sub') return sub(a,b);


// }


// method-2

function doArithmatic(a,b,fun){

    return fun(a,b) // fun == the function passed  as fun


}


const ans1 = doArithmatic(1,2,sum)
const sub = doArithmatic(1,2,sub)


// try to create a calculator
// approach-1: make different function for different operatiations and call them individually
// approach-2: do it using functional arguments
