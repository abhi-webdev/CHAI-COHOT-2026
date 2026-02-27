
function sayHello(){
    console.log(`Say Hello`);    
}

setTimeout(() => {
    sayHello()
}, 3000);


console.log('First');

for (let i = 0; i < 5; i++) {
    console.log(i); 
}
