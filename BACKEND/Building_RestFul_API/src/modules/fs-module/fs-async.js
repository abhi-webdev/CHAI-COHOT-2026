import fs from "node:fs"

// fs.writeFile('async.txt', "Hello abhi", (err) => {
//     if (err) {
//         console.log(err);
        
//     }
//     console.log("file written succesfully");
    
// })

const data = fs.readFile("async.txt", "utf-8", (err, data) => {
     if (err) {
        console.log(err);
        
    }
    console.log("file read succesfully", data);
    
})
