// Given with an array, give me all the even numbers

// method-1
let arr1 = [1,2,3,4,5,6,7,8,9,10];
let ans = [];


for(let i=0; i<arr1.length; i++){
    if(arr1[i] % 2 == 0){
        ans.push(arr1[i]);
    }
}

console.log(`method-1: ${ans}`);

// method-2

function filterLogic(i){
    if(i%2 == 0){
        return true;
    }

    else{
        return false;
    }
}

let arr3 = arr1.filter((i) => (i%2 == 0) ? true : false)
console.log('method-3',arr3);


