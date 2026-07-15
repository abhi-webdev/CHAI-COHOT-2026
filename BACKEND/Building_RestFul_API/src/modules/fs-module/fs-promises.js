import fs from "node:fs/promises"

// await fs.writeFile("promise.txt", "Hello promise")

// const data = await fs.readFile("promise.txt", "utf-8")

// console.log(data);
async function main() {
    const data = await fs.readFile("promise.txt", "utf-8")
    console.log(data);
    
}
main()
