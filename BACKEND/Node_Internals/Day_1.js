
import fs from 'fs'

setTimeout(() => console.log("Hello one"), 0);
setImmediate(() => console.log("Hello Two"), 0)

fs.readFile('read.txt', 'utf-8', (err, data) => {
    console.log("File reading");
    setTimeout(() => console.log("Timer one"), 0);
    setTimeout(() => console.log("Timer two"), 0);
setImmediate(() => console.log("Immediate timer"), 0)
})

console.log("Top level");
