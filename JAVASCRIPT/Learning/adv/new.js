function Car (make, model){
    this.make = make;
    this.model = model
}

const car1 = new Car("Tata", "Safari")
const myNewCar = new Car("Toyota", "Camry")
// console.log(car1);
// console.log(myNewCar);


function tea(type) {
    this.type = type
    this.describe = function(){
        return `This is the cup of ${this.type} tea`
    }
} 

const lemonTea = new tea("Lemon");
console.log(lemonTea.describe());


function Drink(name){
    if (!new.target) {
        throw new Error("Drink must be called with new keyword");
    }
    this.name = name
}

// let chai = new Drink("tea")
// let cofee =  Drink("coffee")

// console.log(chai);
// console.log(cofee);



// t- class ------------------------------------------

// It is mostly used with constructor functions

// Constructor
// 1. Capital letter name [String, Number, Array, Object]
// should be Execute by "new" operator

function User (name) {
    this.name = name;
    this.isPaid = false
}

const ans = new User("Abhi")
console.log(ans);


// new ka jaddu 
// 1. this = {}
// 2. operation
// 3. return this

