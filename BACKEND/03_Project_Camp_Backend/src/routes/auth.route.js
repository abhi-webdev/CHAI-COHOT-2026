import { Router } from "express";
import {
  changedPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userChangedCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidate,
  userRegistervalidaor,
  userResetForgotPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// unsecured routes
router.route("/register").post(userRegistervalidaor(), validate, registerUser);
router.route("/login").post(userLoginValidate(), validate, login);
router.route("/verifyEmail/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

// secure routes
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(userChangedCurrentPasswordValidator(), validate, changedPassword);
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;
