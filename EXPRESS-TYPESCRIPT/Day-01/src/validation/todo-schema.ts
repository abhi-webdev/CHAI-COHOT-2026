import {z} from 'zod'

export const todoValidationSchema = z.object({
    id : z.string().describe('Id of the todo'),
    title : z.string().describe("title of the todo"),
    description : z.string().optional().describe("Description for the todo"),
    isComplete : z.boolean().default(false).describe('if the todo item is completed')
})

export type Todo = z.infer<typeof todoValidationSchema>

// export interface ITodo{
//     id : string
//     title : string
//     description ?: string
//     isComplete : boolean
// } 