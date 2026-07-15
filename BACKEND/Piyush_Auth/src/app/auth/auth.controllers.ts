
import type { Request, Response } from "express";
import { signinPayloadModal, signupPayloadModel } from "./auth.models.js";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, hash, randomBytes } from "node:crypto";
import { createUserToken, UserTokenPayload } from "./utils/token.js";

class AuthenticationController {
    public async handleSignup(req: Request, res: Response)  {
        const validationResult = await signupPayloadModel.safeParseAsync(req.body)
        if (validationResult.error) return res.status(401).json({message: "body validation failed", error : validationResult.error.issues})
        
        const {firstName, lastName, email, password} = validationResult.data

        const userEmailResult = await db.select().from(usersTable).where(eq(usersTable.email, email))

        if(userEmailResult.length > 0) return res.status(400).json({
            error: "Duplicate email",
            message: `User with this email ${email} already exist`
        })

        const salt = randomBytes(32).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex')

        const [result] = await db.insert(usersTable).values({
            firstName, 
            lastName, 
            email,
            password: hash,
            salt
        }).returning({id: usersTable.id});

        return res.status(201).json({
            message: "user has been created successfully",
            data: {id: result?.id}
        })
    }


    public async handleSignin(req: Request, res : Response) {
        const validationResult = await signinPayloadModal.safeParseAsync(req.body);

        if (validationResult.error) {
            return res.status(401).json({message: "body validation failed", error : validationResult.error.issues})
        }

        const {email, password} = validationResult.data;

        const [userSelect] = await db.select().from(usersTable).where(eq(usersTable.email, email));

         if(!userSelect) return res.status(400).json({
            message: `User with this email ${email} already exist`
        })

        const salt = userSelect.salt!
        const hash = createHmac("sha256", salt).update(password).digest('hex')

        if(userSelect.password !== hash) return res.status(400).json({
            message: "email or password is incorrect"
        })

        // Token bano 
        const token = createUserToken({id: userSelect.id})

        return res.status(201).json({message: 'Sign-in success', data: token})
    }

    public async handleme(req: Request, res: Response) {
        // @ts-ignore
        const { id } = req.user! as UserTokenPayload

        const [userResult] = await db.select().from(usersTable).where (eq(usersTable.id, id))

        return res.json({
            firstName: userResult?.firstName,
            lastName: userResult?.lastName,
            email: userResult?.email
        })

    }
}

export default AuthenticationController;