import fs from "fs";

    // fs.writeFile("async.txt", "File create ho gya", (err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("File writen successfully");
    //   }
    // });

    // fs.readFile("async.txt", "utf-8", (err, data) => {
    //     if (err) {
    //         console.log("File reading error", err);
            
    //     } else {
    //         console.log("Reading: ", data);
            
    //     }
    // })


fs.readFile("a.txt", "utf-8", (err) => {
    fs.writeFile("b.txt", "a.txt", (err) => {
        fs.appendFile("b.txt", "done", (err) => {
            fs.unlink("a.txt", (err) => {
                console.log("success");
            })
        })
    })
})