const user = {
    name : "Vidya",
    age : 23,
    roles : {
        isinstructor : false,
        isEditor : true
    }
}

const serialized = JSON.stringify(user, null, 2)
console.log(serialized);

console.log(JSON.parse(serialized, null, 2));
