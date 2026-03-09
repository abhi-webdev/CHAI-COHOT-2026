import express from "express";
import type { Application } from "express";
import todoRouter from "./todo/routes.js";

export function createServerApplication () : Application {
    const app = express()
    // app.get('/',(req, res) => {
    //     return res.json({
    //         message : "Hello jii Kaise hai app"
    //     })
    // })
    // app.get('/hello',(req, res) => {
    //     return res.json({
    //         message : "byy"
    //     })
    // })

    app.use(express.json())
    app.use('/todes', todoRouter )
    return app;
}


