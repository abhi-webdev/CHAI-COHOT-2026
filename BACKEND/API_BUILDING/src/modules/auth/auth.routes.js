import express from "express"
import * as controller from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js"
import RegisterDto from "./dto/register.dto.js"
const router = express.Router

router.get("/register", validate(RegisterDto), controller.register)

export default router