function viralDance () {
    // console.log("Ichu Ichu song");  
}


// first way
const dogesh = {
    name : "Husky",
    dance : viralDance()
}


// dogesh.dance = function(){
//     console.log("Ichu Ichu song");
// }

const doesh2 = {
    name : "doggy",
    dance : function () {
        // console.log("Ilu ilu");   
    }
}

const director = {
    name : "Sanjay leela bansali",
    production () {
        console.log("Creating film"); 
    }
}

// console.log(director);
// director.production()


let user = {
    name : "Piyush Garg",
    age : 26,
    college : "Chitkara university",
    passout : 2021,
    gf : "Maa ka Ladli",

    intro(){
        console.log(`Hi, My name is ${this.name}. I am ${this.age} years old. I studied in ${this.college} and passed out ${this.passout}. My girlfriend's name is ${this.gf}`);
 
    }
}

let piyush = user;
user = null;

// user.intro()
piyush.intro()

