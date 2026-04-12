import express from "express"
import * as controller from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js"
import RegisterDto from "./dto/register.dto.js"
import { authenticate } from "./auth.middleware.js"
import LoginDto from "./dto/login.dto.js"
const router = express.Router()

router.post("/register", validate(RegisterDto), controller.register)
router.post("/login", validate(LoginDto), controller.login)
router.get("/logout",authenticate, controller.logout)
router.post("/verifyEmail",authenticate, controller.verifyEmail)
router.get("/me", authenticate, controller.getMe)

export default router