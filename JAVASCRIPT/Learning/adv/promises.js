/* Js by the way asynchronus nature wali Hoti hai 
    Promises : jb bhi tum server se kuch request karte ho to promises ka concept aata hai kii ya to data milega na to nahi milega
    Promise State
        -> Pending (data execute abhi ho rha hai to abhi pending me hai)
        -> reject (Data nahi mile to reject call hoga)
        -> resolve (Data mil gya to resolve ke throgh output aa jayega)
    new promises((resolve, reject) => {

    })

    promises me setTimeOut ka bhi concept ata hai jo ye batata hai kii tumahara data kitne time baad output dega
    setTimeOut((data) => {
            //code hear
    }, 3000)

    # Agar code execute ho gya hai to .then method ke trough output print kara sakte hai 
    ## Agar code fail hua to .catch method ke through error aa jayega 
    ## finally() ->  ye methode dono method ke sath chalta hai
*/

/*
const data = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(false){
            resolve("Run")
        } else {
            reject("Failed")
        }
    }, 2000);
})

data
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Code done");
    })
*/

/*
fetch server se data mangata hai ur jo bhi data aata ahai wo pending me aata hai
    -> console.log(fetch("https://jsonplaceholder.typicode.com/users/5"))  
        output :- Pending
Server se jo bhi data ata hai wo use JSON me convert karte hai pahle 
.then(() => {})  -> data output me dega if data will be come  
.catch((error) => {})  -> Data nhi aaya to error dega 

*/

/*
fetch("https://jsonplaceholder.typicode.com/users/5")
    .then((response) => response.json())
    .then(data => {
        console.log(data.name);  
    })
    .catch((error) => {
        console.log(error);
    })

*/

// console.log(typeof Promise);

/*
    Promises channing 
    -> jb promises ke andar multiple time .then() ko use karte hai to ye promises channing kahlata hai
    -> har .then() ka return next .then() me jata hai 

*/

/*
const user = new Promise((resolve, reject) => {
    resolve(10);
})

user
    .then((marks)=>{
        console.log(marks);
        return marks*2
    })
    .then((marks) => {
        console.log(marks);
        return marks*3
    })
    .then((marks) => {
        console.log(marks);
    })


// Example 2 : 
const data = fetch("https://jsonplaceholder.typicode.com/users/1")
data
    .then((response)=>{
        return response.json()
    })
    .then((user) => {
        console.log(user.name);
        return `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    })
    .then((post) => {
        console.log(post.length);
        
    })

*/



/*
async/await
    ye javascript ka modern way hai promises ko handle karne ka 
    ye internally promises chainning hii karta hai

    async => async normal function ko promises returning function bana data hai
    await -> jb tak promise resolve na ho tb tak await wait karta hai 

*/
/*
async function user() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Abhi")
        }, 3000)
    })

}

// const data = await user()
// console.log(data);

async function fetchData(){
    let data = await user()
    console.log(data);
}
fetchData()
 
*/

// example 
/*
async function getUser() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();
        console.log("User Name:", data.name);
    } catch (error) {
        console.log("Error:", error);
    }
}

getUser();

*/

// Real ordering example

function placeOrder () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Order placed");
            resolve({orderId : 1234, item : "Sandwich"})
        }, 2000)
    })
}

function orderItem (order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("payment ordered");
        resolve({...order, paymentStatus : "Success" })
        }, 2000);
    })
}

function delivered(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Item delivered", order.item);
        resolve("✅ Delivery complete")
        }, 2000)
    })
}


async function orderDetails() {
    try {
        const placed = await placeOrder();
        const payment = await orderItem(placed);
        const delivery = await delivered(payment);
    
        console.log(delivery);
    } catch (error) {
        console.log(error);
        
    }
    
}

// orderDetails()



function fetchData (){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = false;
            if(success){
                resolve("data fetched successfully");
            } else {
                reject("Data failed")
            }
        }, 2000);
    })
}

fetchData()
    .then((data)=> {
        console.log(data);
        return "Abhimanyu"
    })
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error))