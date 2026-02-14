// promisification of setTimeout

function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000).then(
    console.log('runs successfully')
)


// this too has callback hell

setTimeoutPromisified(1000).then(function () {
  console.log("hi");
  setTimeoutPromisified(3000).then(function () {
    console.log("hello");
    setTimeoutPromisified(5000).then(function () {
      console.log("hello there");
    });
  });
});

// without callback hell

setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });


//   promise is class
/*

class Promise{

  constructor(executorFunction){
  
    this executor function has two arguments(resovle, reject)

  }

  then()

  catck

}

*/