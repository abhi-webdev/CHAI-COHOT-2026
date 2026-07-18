import { z } from "zod"

export const createUserSchema = z.object({
    name: z.string().min(3, "Name Must be atleat 3 charcter"),
    email: z.email("Email is required"),
    password: z.string().min(6, "Password must be atleast 6 character")
})

export type CreateUserSchemaTypes = z.infer<typeof createUserSchema>