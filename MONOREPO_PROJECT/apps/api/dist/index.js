import express from "express";
import { createUserSchema } from "@MONOREPO_PROJECT/utils";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello pears");
});
app.post("/users", (req, res) => {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        return res.status(400).json({
            success: false,
            message: message
        });
    }
    console.log(result.data);
    return res.json({
        success: true,
        message: "user created",
    });
});
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});
//# sourceMappingURL=index.js.map