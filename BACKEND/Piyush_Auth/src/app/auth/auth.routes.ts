import express from "express";
import type {Router} from "express"
import AuthenticationController from "./auth.controllers.js";
import { restrictAuthenticatedUser } from "./middlewares/auth.middleware.js";

const authenticationController = new AuthenticationController()

export const authRouter : Router = express.Router();

authRouter.post("/sign-up", authenticationController.handleSignup.bind(authenticationController));
authRouter.post("/sign-in", authenticationController.handleSignin.bind(authenticationController))

authRouter.get("/me", restrictAuthenticatedUser(), authenticationController.handleme.bind(authenticationController))