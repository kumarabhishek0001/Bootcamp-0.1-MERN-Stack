class Shape{
    constructor(color){
        this.color = color;
    }

    paint(){
        console.log('Painting with color:',this.color);
    }

    // if you forgot that area has to implemented in sub class. The control shifts to parent class and the following error is show 
    area(){
        throw new Error('The area method must be implemented in subclass');
    }
}


class Rectangle extends Shape{



    constructor(width, height,color){

        super(color);

        this.width = width;
        this.height = height;
        this.color = color;
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

class Circle extends Shape{
    constructor(radius,color){
        super(color)
        this.radius = radius;
    }

    area(){
        return 3.14(this.radius)*(this.radius);
    }

    perimeter(){
        return 2*3.14*(this.radius);
    }

    


}

class Square extends Shape{
    constructor(side,color){
        super(color)
        this.side = side;
    }

    area(){
        return this.side*this.side;
    }

    perimeter(){
        return 2*this.side
    }




}


const r1 = new Rectangle(10,5,'red');
r1.paint()
r1.area()


const c1 = new Circle(10,'pink');
c1.paint()


const s1 = new Square(10, 'blue')