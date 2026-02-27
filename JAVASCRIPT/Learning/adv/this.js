console.log(this);

function ranveer() {
    console.log(typeof this);
}

function ranveerWithNoScript(){
    "use strict"   // undefined
    return this
}

const res = ranveerWithNoScript

const bollywood = {
    name : "Bajirao mastani",
    lead : "Ranveer",
    introduce(){
        return `${this.lead} performed in ${this.name}`
    }
}

// console.log(bollywood.introduce());

const filmDirector = {
    name : "Sanjay leela bansali",
    cast : ["Ranveer", "Deepika", "Priyanka"],
    announceCast(){
        return this.cast.forEach((actor) => {
            console.log(`${this.name} introduce ${actor} actor`);
        })
    }
}

// filmDirector.announceCast()


/* Iregular nested function inside the function does not exist  */
const filmSet = {
    crew : "Spot boys",
    prepareProp(){
        console.log(`Outer crew : ${this.crew}`);
        function arrangeChair(){
            console.log(`Inner Crew : ${this.crew}`);
        }
        arrangeChair()
        const arrangeLimit = () => {
            console.log(`Arrow func : ${this.crew}`);   
        }
        arrangeLimit()
    },
}

filmSet.prepareProp()


// Deteched method 

const actor = {
    name : "Ranveer",
    bow(){
        return `${this.name} take a bow`
    }
}

const detachedBow = actor.bow
console.log(detachedBow());
