# Classes
Blue print template for creating an object in Javascript. Objects are instance of classes in Javascript.

Objects is a specific instance of class.

## Declaring Class
```js
class Rectangle{
    constructor(length, width, color){
        this.width = width;
        this.length = length;
        this.color = color;
    }

    area(){
        const area = this.width * this.length;
        return area;
    }

    perimeter(){
        const perimeter = 2*(this.width + this.length)
        return perimeter;
    }

    // adding static property
    static whoAmI(){
        return 'I am a rectangle'
    }

}
```

### Constructor Method
It is a special function or method that is used to create and initialize object in class.

```js
// constructor method inside reclangle class
constructor(length, width, color){
    this.width = width;
    this.length = length;
    this.color = color;
}
```

### Static Method
A static method in javascript is a function that belongs to class itself not the instance of the the class.

```js
// inside the Rectangle Class
static whoAmI(){
    return 'I am a rectangle'
}
```



## Using class
```js
const r1 = new Rectangle(10,5);

const r1Area = r1.area();
console.log(r1Area)

const r1Peri = r1.perimeter();
console.log(r1Peri)
```


Now while making multiple classes we observed something, some classes have common properties like what paint should me done insdie the shape. When making a 3D object the volume can be derived easily like say cylinder, squre, rectangle -> while making cube, cuboid or cylinder we can have same formula.

This is were inheritance comes in, we can inherit or better to say a child class can inherit properties from it's parent class.

## Inheritance

Creating a parent class called shape. Every shape(circle, square, rectangle) will have a property called paint so rather than making a paint method in every class we make a parent class with such common properties and the children inherit from that.

### Parent class

```js
class Shape{
    constructor(color){
        this.color = color;
    }

    paint(){
        console.log(`Painting it with color: ${this.color}`)
    }

    area(){
        throw new Error('Area must be implemeted in class');
        
    }
}
```

### Implementation of area method in parent class??
Althorugh calculation of area will be different for different shapes therefore this should be implemented differetnly for different shapes. But this is just in case if we forget to add area method in a class the interepretted reads area from the shape and throw an error saying that area should be implemted in the subclass.

## Connecting children to parent
```js
class Circle extends Shape{
    
    constructor(radius, color){
        super(color);
        this.radius = radius;
    }

    perimeter(){
        const perimeter = 2*3.14*this.radius;
        return perimeter;
    }

    area(){
        const area = 3.14*this.radius*this.radius;
        return area;
    }
}


class Square extends Shape{
    constructor(side,color){
        super(color);
        this.side = side;
    }

    perimeter(){
        const perimeter = this.side*this.side;
        return perimeter; 
    }

    // forget's to do area implemetation here. Since are is not found here the interpretter checks in the class if area exists. So we generate an error in the class shape.
}
```

Here the extend keyword connects the parent and children, here children inherits property from parent and the **super** keyword is used to call the constructor of the parent.

Here intentionally i have left areea implemtation in squre so when we call area it throw error.

# Promise
- A promise in js is an object that represents the eventual completion (or failure) of an asynchronus operation and its resulting value.

- Promise can handle asynchronus operation more effectively htan traditional callback functions, providing a cleaner and more managable way to deal with code that executes asynchronusly, such as API class, file I/O or timers.

- promise 3 state -> pending, resolved and rejected

- microtask and macrotask 1:44:50

```js
const fs = require('fs');


// this is kind of a promise (mental model) -> it represent eventual completion or failure of readFile. This is what promise also do
function callbackFn(err, content){
    console.log(content)
}

const content = fs.readFile("./readthis.txt", "utf-8", callbackFn);
```

## Calling a Promise

```js
// promisification of setTimeOut

function setTimeOutPromisified(ms){
    let p = new Promise(resolve => setTimeout(resolve,ms));
    return p;
}

function callBack(){
    console.log('Hello world');
}

// calling a promise
setTimeOutPromisified(1000).then(callBack)
```

### Promisifying ReadFile

```js

function readFilePromisified(path, encoding){
    let  p = new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (err,data) => {
            if(err){
                reject(err);
            }

            else{
                resolve(data)
            }
        })
    })

    return p;
}

```

### Calling promisified readfile

```js
readFilePromisified('./readthis.txt', 'utf-8').then((content) => {
    console.log(content)
}).catch((err) => {
    console.log(err)
})
```

## Callback Hell

A callback inside a callback inside a callback inside a callback creates a callback hell. All through clever code can avoid this situation it is often good to answer that in order to avoid a callback hell we make use of promises

**Why promises were made?**

*Problem statement* - Create a function that calls another function after 1000s and after 1000s the inner function calls another function after wating 3000s and another functios that runs after the completion of 3000s waiting to run after 5000s

### Solving with callback hell

```js
setTimeout(() => {
    console.log('Running after 1000s');
    setTimeout(() => {
        console.log('Running after 3000s')
        setTimeout(() => {
            console.log('RUnnig after 5000s')
        },5000)
    } ,3000)
}, 1000)
```

### Solving without callback hell

```js
function function5000(){
    console.log('RUnnig after 5000s')
}


function function3000(){
    console.log('Running after 3000s');
    setTimeout(function5000, 5000);
}

function function1000(){
    console.log('Running after 1000s')
    setTimeout(function3000, 3000);
}

setTimeout(function1000, 1000)

```

## Promisifiying settime out
- Promise to have callback hell write code to avoid

```js
// promise with callback hell
setTimeoutPromisified(1000).then(
    function () {
        console.log('running after 1000ms');
        setTimeoutPromisified(3000).then(function () {
            console.log('running after 3000ms');
            setTimeoutPromisified(5000).then(function(){
                console.log('Running after 5000ms')
            })
        });
    }
)
```

### Without callback hell

```js
setTimeoutPromisified(1000)
    .then(function () { 
        console.log('RUnning after 1000ms');
        return setTimeoutPromisified(3000)
    })
    .then(function () {
        console.log('Running after 3000s');
        return setTimeoutPromisified(5000);
    })
    .then(function () {
        console.log('Running after 5000ms')
    })

```