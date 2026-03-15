import {Router} from "express"
import { login, logout, registerUser } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validator.middleware.js"
import {userLoginValidate, userRegistervalidaor} from "../validators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(userRegistervalidaor(), validate,  registerUser)
router.route("/login").post(userLoginValidate() , login)
router.route("/logout").post(verifyJWT, logout)

export default router