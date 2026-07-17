import express from "express"
import http from "node:http"
import path from "node:path"
import { Server } from "socket.io"

const app = express()
app.use(express.static(path.resolve("./public")))
const httpServer = http.createServer(app)

const io = new Server()
io.attach(httpServer)

const PORT = process.env.PORT || 8000


app.get("/health", (req, res) => {
    return res.json({healthy: true})
})

httpServer.listen(PORT, () => {
    console.log(`Server is listining on port ${PORT}`);
    
})