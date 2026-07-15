
import { email, optional, z } from "zod"

export const signupPayloadModel = z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional().nullable(),
    email: z.string(),
    password: z.string().min(6)

})

export const signinPayloadModal = z.object({
    email: z.string(),
    password: z.string().min(6)
})