// Reachability 
// objects are retained in memory while they are reachable

let temp = {
    email : "abhi@gmail.com",
    valid : '5'
}

temp = null
// there are no way access it, no reference to it 
// Garbage collection will jusk the data and free the memory
// console.log(temp);
// console.log(temp.email);


const movie = {
    relaease : 2023,
    production : "Apple TV"
}

function coStar(actor, actress) {
    actor.coStar = actress
    actress.coStar = actor

    return {
        leading : actor,
        supporting : actress
    }
}

movie.cast = coStar(
    {name : "Chrish evans", salary : 100_000},
    {name : "Ana de Armas", salary : 2_00_000}
)


console.log(movie);

movie.cast = null;



