import fs from "node:fs"
fs.writeFileSync("test.txt", "Hello from fs file!")
const data = fs.readFileSync("test.txt", "utf-8")

fs.appendFileSync("test.txt", "\nKaya hal hai")
console.log(data);

// fs.mkdirSync("my-folder/inner-folder")

// fs.unlinkSync("test.txt")

// fs.rmdir("my-folder/inner-folder", (err) => {
fs.rmdir("my-folder", (err) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Folder deleted successfully");
    }
});