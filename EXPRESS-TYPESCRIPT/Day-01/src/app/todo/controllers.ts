import { todoValidationSchema, type Todo } from "../../validation/todo-schema.js"
import type { Request, Response } from "express"

class TodoController {
    private _db : Todo[]
    constructor() {
        this._db = []
    }

    public handleGetAllTodos(req: Request, res: Response) {
        const todos = this._db;
        return res.json({todos})
    }

    public async handleInsertTodes(req: Request, res: Response){
        try {
            const unValidated = req.body
            const validationResult = await todoValidationSchema.parseAsync(unValidated)
            this._db.push(validationResult)
            return res.status(201).json({ 
                todo : validationResult,
                message : "Validation success todo insert"
            })
        } catch (error) {
            return res.status(500).json({
                error : 'Validation failed ho gya'
            })
        }
    }
}

export default TodoController