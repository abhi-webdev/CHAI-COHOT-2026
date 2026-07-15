import express from "express"
import type {Express} from "express"
import { authRouter } from "./auth/auth.routes.js"
import { authenticationMiddleware } from "./auth/middlewares/auth.middleware.js"

export function createApplication() : Express {
    const app = express()

    // middleware
    app.use(express.json())
    app.use(authenticationMiddleware())


    // routes
    app.get("/check", (req, res) => {
        return res.json({
            message: "Hello ChaiCode Authentication Server"
        })
    })

    app.use("/auth", authRouter)


    return app;
}