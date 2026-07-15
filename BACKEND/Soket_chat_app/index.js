import express from "express"
import { log } from "node:console"
import http from "node:http"
import path from "node:path"
import { Server } from "socket.io"

const app = express()

app.use(express.static(path.resolve("./public")))

const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message) 
    })
})


server.listen(3000, () =>{
    console.log("Server is listining on port 3000");
    
})