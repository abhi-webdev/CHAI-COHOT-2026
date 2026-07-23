import express from 'express';
import "dotenv/config"
import { todos, createTodo, deleteTodo } from './store.js';
import { serve } from 'inngest/express';
import { inngest } from './inngest/client.js';
import { onTodoCreated, onTodoDeleted } from './inngest/function.js';

const app = express();
app.use(express.json());

app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions: [onTodoCreated, onTodoDeleted],
  }),
);

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    });
  }

  const todo = createTodo(title);
  await inngest.send(
    {
        name: "todo/created",
        data: {todo}
    }
  )
  return res.status(200).json({
    success: true,
    message: 'todo created successfully',
    todo,
  });
});

app.delete("/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    
    const todo = deleteTodo(id)

    console.log(todo);
    
    if (!todo) {
        return res.status(401).json({
            success: false,
            message: "Todo not found"
        })
    }

    await inngest.send(
        {
            name: "todo/deleted",
            data: {todo}
        }
    )
    res.status(200).json(todo)
})

app.listen(8080, (req, res) => {
  console.log('Server is listining on port 8080');
});
