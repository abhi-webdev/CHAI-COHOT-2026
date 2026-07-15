
import fs from 'fs'
import crypto from 'crypto'

setTimeout(() => console.log("Hello one"), 0);
setImmediate(() => console.log("Hello Two"), 0)

let start = Date.now()
process.env.UV_THREADPOOL_SIZE = 2;

fs.readFile('read.txt', 'utf-8', (err, data) => {
    console.log("File reading");
    setTimeout(() => console.log("Timer one"), 0);
    setTimeout(() => console.log("Timer two"), 0);
    setImmediate(() => console.log("Immediate timer"), 0)

    crypto.pbkdf2("password", "salt", 30000, 1024, 'sha256', () => {
        console.log("Password 1 has been hashed", Date.now() - start);
    })
    crypto.pbkdf2("password", "salt", 30000, 1024, 'sha256', () => {
        console.log("Password 2 has been hashed", Date.now() - start);
    })
    crypto.pbkdf2("password", "salt", 30000, 1024, 'sha256', () => {
        console.log("Password 3 has been hashed", Date.now() - start);
    })
    crypto.pbkdf2("password", "salt", 30000, 1024, 'sha256', () => {
        console.log("Password 4 has been hashed", Date.now() - start);
    })
    crypto.pbkdf2("password", "salt", 30000, 1024, 'sha256', () => {
        console.log("Password 4 has been hashed", Date.now() - start);
    })
})

console.log("Top level");
