// a class is a way to define blueprint of an object

// The constructor is called whenever a new instance of the class is created

// this refers to the object that is currently executing the code.

// static object - not attached with the instance. Used along with the Class

class Rectangle{
    constructor(width, height, ){
        this.width = width;
        this.height = height;
    }

    area(){
        const area = this.width * this.height;
        return area;
    }

    perimeter(){
        return 2*(this.height*this.width)
    }

    static whoAmI(){
        return 'I am rectangle';
    }
}

const r1 = new Rectangle(10,5)
console.log(r1)
const r1Area = r1.area();
console.log(r1Area);

const r1Perimeter = r1.perimeter();
console.log(r1Perimeter)

// calling static method -> does not need data of particular instance
const whoAmI = Rectangle.whoAmI()
console.log(whoAmI)


// inbuilt classes in js

const d1 = new Date;
console.log(d1.getDate())
console.log(d1.getMonth())
