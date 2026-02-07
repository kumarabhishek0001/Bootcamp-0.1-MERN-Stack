// how t declare a function 

// method:1
function sum(a,b){
    let y = a + b;
    console.log(y);

    return y;
}

sum(10,2)

// method:2

let sub = (a,b) => {
    let y = a-b;
    console.log(y);

    return y;
}

// there is a differce between these two method especially how the keyword "This" gets binded.


// dont't get confused when you see
app.get("/", (res,req) => {

})

// this exactly same as writing

app.get("/", function(req, res){
    
})