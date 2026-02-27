const prithviRaj = {
    name : "PrithviRaj",
    generation : "GrandFather",
    cookTraditionalDish(){
        return `${this.name} cooked dish`
    }
}

const raj = Object.create(prithviRaj);

raj.name = "raj"
raj.generation = "Father"
raj.business = function(){
    return `${this.name} know to run the business`
}

const ranbir = Object.create(raj)

ranbir.name = "Ranbir"
ranbir.generation = "Son"
ranbir.makeFilm = function(){
    return `${this.name} make films`
}

console.log(ranbir.makeFilm());
console.log(ranbir.business());
console.log(ranbir.cookTraditionalDish());


// ------------------------------------------------

let genericCar = {
    tyres : 4
}

let tesla = {
    driver : "AI"
}

Object.setPrototypeOf(tesla, genericCar)
console.log(`tesla` , Object.getPrototypeOf(tesla));




