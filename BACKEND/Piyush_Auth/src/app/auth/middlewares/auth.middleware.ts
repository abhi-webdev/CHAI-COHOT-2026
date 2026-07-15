import {Request, Response, NextFunction} from "express"
import { verifyUserToken } from "../utils/token.js";

export function authenticationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers['authorization'];

        if(!header) {
            return next()
        }

        if(!header?.startsWith("Bearer") ){
            return res.status(400).json("Headers must be starts with bearer")
        }   

        const token = header.split(' ')[1]

        if (!token) {
            return res.status(400).json("Headers must be starts with bearer and followed by token")
        }

        const user = verifyUserToken(token);
        // @ts-ignore
        req.user = user;

        next()
    }
} 

export function restrictAuthenticatedUser() {
    return function (req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if(!req.user) return res.status(401).json({ message: "Authentication required" })

            next()
    }
}