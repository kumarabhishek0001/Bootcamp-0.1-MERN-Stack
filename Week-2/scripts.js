

function problem1() {
    let sample = ["apple", "banana", "apple", "orange", "banana", "apple"];

    let fruitCount = {

    }

    for (let i = 0; i < sample.length; i++) {
        if (!fruitCount[sample[i]]) {
            fruitCount[sample[i]] = 1;
        }

        else {
            fruitCount[sample[i]] = fruitCount[sample[i]] + 1
        }
    }

    console.log(fruitCount)
}

function problem2() {
    let sample = { a: "x", b: "y", c: "z" };
    console.log(sample)

    // readable format
    let sampleEnteries = Object.entries(sample);
    for (let arr of sampleEnteries) {
        const temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
    }

    let sampleSolution = Object.fromEntries(sampleEnteries)
    console.log(sampleSolution)

    // make it tough now
    let solution = Object.fromEntries(
        Object.entries(sample).map((k, v) => (v, k))
    )

    // modidying while iterating is not safe
    // for(key in sample){
    //     let storeKey = key;
    //     let storeValue = sample[key];

    //     delete sample[key];

    //     sample[storeValue] = storeKey;
    // }
    // console.log(sample)

}

function problem3() {
    const sample = { a: 10, b: 50, c: 20 }

    let sampleArr = Object.entries(sample);

    let largestPair = [sampleArr[0][0], sampleArr[0][1]]

    for (let [key, value] of sampleArr) {
        if (value > largestPair[1]) {
            largestPair = [key, value];
        }
    }
    console.log(largestPair[0]);
}

function problem4() {
    // flatten object of arrays into one array
    const sample = { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] };
    const sampleArr = [];

    for (let key in sample) {
        for (let arrVal of sample[key]) {
            sampleArr.push(arrVal)
        }
    }

    console.log(sampleArr);

    // method-2

    const sol = [];
    for (let arr of Object.values(sample)) {
        for (let val of arr) {
            sol.push(val);
        }
    }

    console.log(sol)

    // method-3


    const sol2 = Object.values(sample).flat();
    console.log(sol2);
}

function problme5() {
    let addressDetails = [
        { name: "A", city: "Delhi" },
        { name: "B", city: "Mumbai" },
        { name: "C", city: "Delhi" }
    ]

    function groupByCity(sample) {
        let result = {};

        for (let obj of sample) {

            let data = Object.values(obj)

            if (!result[data[1]]) {
                result[data[1]] = [data[0]]
            }

            else {
                result[data[1]].push(data[0])
            }

        }

        return result;

    }

    console.log(groupByCity(addressDetails))
}

function problem6() {
    let sample = { a: 20, b: 60, c: 40, d: 90 };
    let filteredSample = {};

    for (let key in sample) {

        if (sample[key] > 50) {
            filteredSample[key] = sample[key];
        }

    }

    console.log(filteredSample);
}

function problem7() {
    function arrayAvg(arr) {
        let sum = 0;
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            sum += arr[i];
        }

        let average = sum / n;
        return average;
    }

    let sample = { A: [80, 90], B: [70, 75, 85] };

    let maxAverage_student = 0;
    let maxAverage = 0;

    for (let key in sample) {

        let student = key;
        let studentMarks = sample[key];

        let studentAverage = arrayAvg(studentMarks);

        if (studentAverage > maxAverage) {
            maxAverage = studentAverage;
            maxAverage_student = student;
        }

    }

    console.log(maxAverage_student);

}

function problem8() {
    const sample = { x: [1, 2, 3], y: [2, 3, 4], z: [4, 5] }

    const sampleArr = Object.values(sample).flat(Infinity)

    const sortedSampleArr = sampleArr.sort()

    const uniques = [];

    for (let val of sortedSampleArr) {

        if (uniques.length == 0 || uniques.at(-1) !== val) {
            uniques.push(val)
        }
    }

    console.log(uniques);
}

function problem9() {
    let data = { name: "Rahul", age: 23, city: "Noida" }

    let { name: user_name, city } = data;
    console.log(user_name, city)
}


function problem10() {

}


function problem11() {

}


function problem12() {
    let obj = { a: 3, b: 1, c: 2 }

    let entries = Object.entries(obj)

    entries.sort((a, b) => a[1] - b[1]);

    console.log(entries);
}

function problem13() {
    let sample = { a: 1, b: 2, c: 3 }

    const length = Object.keys(sample).length
    console.log(length)
}


function problem14() {

    // let sample = { name: "alice", city: "delhi" }

    // for(let key in sample){

    //     let word = sample[key];
    //     let captializedWord = sample[key][0].toUpperCase() + sample[key].slice(1);

    //     sample[key] = captializedWord;
    // }


    // console.log(sample);


    // for in is not safe  at it also checks the protoype chain if an object inherits parents props hence those are also counted

    const sample = { name: "alice", city: "delhi" };

    for (const [key, value] of Object.entries(sample)) {

        if (typeof value === 'string' && value.length > 0) {
            sample[key] = value[0].toUpperCase() + value.slice(1);
        }
    }

    console.log(sample)

    // for(const key of Object.keys(sample)){

    //     const word = sample[key];

    //     if(typeof(word) === "string" && word.length>0){

    //         const capitalizedWord = word[0].toUpperCase() + word.slice(1);
    //         sample[key] = capitalizedWord;

    //     }
    // }

    // console.log(sample);



}

function problem15() {

    // Convert object to query string
    let sample = { name: "Alice", age: 25, department: "Sales", isEmployed: true, activeUser: false }

    const query = new URLSearchParams(sample).toString()
    console.log(query);

}


function problem16() {
const sample = [1, 2, 3, 4, 5, 6]

let evenOddCount = {}

for (let val of sample) {

    if (typeof val === 'number') {
        if (val % 2 === 0) {
            evenOddCount['even'] = (evenOddCount['even'] || 0) + 1;
        }

        else {
            evenOddCount['odd'] = (evenOddCount['odd'] || 0) + 1;
        }
    }

}

console.log(evenOddCount);


// method-2
for(const vals of sample){
    if(!Number.isFinite(vals)) continue;

    const key = (vals%2==0) ? 'even' : 'odd';

    evenOddCount[key] = (evenOddCount[key] || 0) + 1;
}

console.log(evenOddCount)

}

function problem17(){
    // algoritmically slow -> will not scale well
const set1 = { a: 1, b: 2, c: 3 }; 
const set2 =  { b: 4, c: 5, d: 6 };

const keys1 = Object.keys(set1);
const keys2 = Object.keys(set2);

let commonKey = [];

for(const vals1 of keys1){
    for(const vals2 of keys2){
        if(vals1 === vals2) commonKey.push(vals1)
    }
}

console.log(commonKey);



// method-2

let common = []
for(const val in Object.keys(set1)){
    if(val in set2){
        common.push(val);
    }
}
}


function problem18(){

    const sample = [{ id: 1, name: "A" }, { id: 2, name: "B" }]

const indexedSample = {};

let index = 1;
for(const obj of sample){

    indexedSample[index] = obj;
    index++;

}

console.log(indexedSample);


// better way


for(let obj in sample){
    indexedSample[obj.id] = obj;
}

console.log(indexedSample);
}


function problem19(){
function checkNumber(sample) {
    if (typeof sample !== "object" || sample === null) {
        return false;
    }

    for (const val of Object.values(sample)) {
        if (!Number.isFinite(val)) return false;
    }

    return true;
}

}

