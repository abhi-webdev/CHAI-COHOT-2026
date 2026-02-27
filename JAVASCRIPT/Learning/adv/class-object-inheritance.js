
// pofflyfiles -> custom method
Array.prototype.abhi = function(){
    return this
}

let ans = [3,2,1,3,4].abhi()
// console.log(ans);


// Class
// class Vehical{
//     constructor(name, model){
//         this.name = name
//         this.model = model
//     }

//     start(){
//         return `${this.model} is a car of ${this.name}`
//     }
// }


// class Car extends Vehical{
//     drive(){
//         return `${this.name} : This is an inheritance`
//     }
// }

// const myCar = new Car("Toyota", "35model")
// console.log(myCar.drive());
// console.log(myCar.start());



class Student {
    constructor(name, age){
        this.name = name;
        this.age = age
    }
    study(){
        return `${this.name} age is ${this.age}`
    }
}

class Stu1 extends Student{
    semester () {
        return `${this.age} is in ${this.name}`
    }
}

let abhi = new Student("Abhimanyu",20)
console.log(abhi.study());


