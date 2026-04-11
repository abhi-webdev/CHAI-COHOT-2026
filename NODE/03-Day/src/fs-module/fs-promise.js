import fs from "fs/promises"

const data = await fs.readFile("promise.txt", "utf-8")

console.log(data);
