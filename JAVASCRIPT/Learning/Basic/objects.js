


let gemini = new Object()  // object constructor function 
let claude = {} //Object literal 

const gpt = {
    company : "OpenAi",
    version : 5.3,
    releaseYear : 2025,
}

// console.log(gpt.company);

// add new property
gpt.type = "Large language model"
gpt.isMultimodal = true

// modify
gpt.type = "LLM"

// remove 
delete gpt.version;


// console.log(gpt);

//----------------------------------------------------

const sonet = {
    company : "anthropic",  // key : Value
    version :4.6,
    "release on" : 2026,  // multiword properties must be added 
    1 : "claude"

}

// -> LAst comma ko tralling comma kahte hai 

// square bracket notation 
// console.log(sonet["release on"]);
// console.log(sonet[1]);


const input = "company"
// console.log(claude[input]);  // undefined
// console.log(sonet[input]);  // anthropic



// properties short hand -----------------------
function getLaptop(name, price){
    // console.log("yu hu");
    return {
        brand : "Apple",
        name,
        price,
    }
}

let myMac = getLaptop("M4 air", 909329)
// console.log(myMac);

// search properties

// console.log(myMac.ram === undefined );
// console.log("ram" in myMac);

// looping on object -> for... in
for(let key in myMac){
    // console.log(key);   
    // console.log(myMac[key]);   
}


// country code 
const codes = {
    '+7' : "Russia",
    '+32' : "Belgium",
    '+91' : "India",
    '+1' : "Canada"
}
// integer properties by default sorted 
// console.log(codes);
for (const key in codes) {
    // console.log(`${key} : ${codes[key]}`); 
}


// primitive are always copied as avalue 
let like = "Radikha das"
let love = like;

like = "Taylor swift"
// console.log(like);   // Taylor swift
// console.log(love);   // Radikha das

// object are stored and copied "By reference"

let  artist = {
    name : "Radhika Das",
    country : "UK"
}

let kriteny = artist
artist.country = "England"
// console.log(kriteny);
// console.log(artist);

// store as reference 

let a = {}
let b = {}
// console.log(a === b);  // false 
// console.log(typeof a === typeof b);  // true


// clone object 

const org = {
    k1 : "v1",
    k2 : "v2",
    k3 : "v3",
}

let clone = {}
for (const key in org) {
    clone[key] = org[key]
}

// console.log(clone);


// another way to clone in simple way
clone = Object.assign({}, org)
// console.log(clone);


// nexted object 
const nestedObj = {
    model : "gpt",
    version : "5.3",
    capablities : {
        reasoning : true,
        codeGeneratio : true,
        imageUnderstanding : true,
        toolUse : true,
        functionCalling : true,
        streaming : true,
    }
}


// DEEP cloning 
const nestedClone = structuredClone(nestedObj)
nestedClone.version = "6.2"
console.log(nestedClone);
