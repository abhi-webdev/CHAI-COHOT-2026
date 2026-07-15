import fs from "node:fs"

// write file synchronously
fs.writeFileSync("test.txt", "Hello, from fs-sync");


// read

const data = fs.readFileSync("test.txt", "utf-8")
// console.log(data);


// append 

fs.appendFileSync("test.txt", "\nkay hal chal")

// create folder
// fs.mkdirSync("my-folder")
// fs.mkdirSync("my-folder/inner-folder")
// fs.mkdirSync("my-folder/second-folder", {recursive: true})

//--------- delete 

// fs.unlinkSync("test.txt")


// --------- rename

// fs.renameSync("test.txt", "abhi.txt")

// ------------- copy
// fs.cpSync("abhi.txt", "final.txt")

// ----------- delete folder
fs.rmdirSync("my-folder/second-folder")
