/*
function cookdish(ingredients, style) {
    return `${this.name} prepare ${ingredients} in ${style} style`
}

const sharmaKitchen = {name : "Sharma kitchan"}
const guptaKitchen = {name : "Gupta kitchen"}

console.log(cookdish.call(sharmaKitchen, "Paneer-Makhni", "Mugali"));

const guptaOrder = ["chole kulche", "Panjabi dabha"]

console.log(cookdish.apply(guptaKitchen, guptaOrder));

*/

/*

function greet(age, city){
    console.log(`Hello, ${this.name} which score is ${this.score} age is ${age} from ${city} `);
    
}
const person = {
    name: "Abhi"
}

const score = {
    score : 98
}

const mergerd = {...person, ...score}
// greet.call(person, score , 20, "Mairwa")
*/
/*
    Call() ka first argument hamesa this hii hota hai
    call() me sirf ek hii this object ban sakta hai 
    Multiple object  ko this me nhi de sakte hai
*/
// greet.call(mergerd, 20, "Mairwa")


// greet.call(person, 20, "Bhopal")


/**********************************************************************
    Apply()
    First argument -> this,
    second Argument -> arr of argument[20, "Mairwa"]
 

*/

function student(age, city){
    console.log(`${this.name} which age is ${age} form ${city}`);
    
}

const stu = {
    name: "abhimanyu"
}

student.apply(stu, [20, "Mairwa"])


// Find Greatest number from array
const arr = [10,20,50,20,5];
console.log(Math.max.apply(null, arr));


function person(){
    console.log(this.name);
    
}

person.apply(null)


/*----------------------------------------------------*/

/*
bind()
    bind this ko permanently set karta hia 
    bind new function return karta hai 

    */

function person(age, city){
    console.log(`${this.name} which age is ${age} ans city is ${city} `);
    
}
const stu1 = {
    name : "Anand"
}

const newfun = person.bind(stu1, 19, "siwan")
newfun()

