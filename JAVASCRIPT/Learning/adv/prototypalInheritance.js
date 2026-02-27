let arr = [2,3,4,5]

Array.prototype.myForEach = function(){
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
} 

Array.prototype.myMap = function(func){
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr.push(func[i])
    }
    return newArr;
}

arr.myForEach()
let ans = arr.myMap(function(){})
console.log(ans);


function Person(name){
    this.name = name;
}

Person.prototype.greet = function(){
    console.log(`Hello, my name is ${this.name}`);
    
}

let anand = new Person("Abhimanyu")
anand.greet()

