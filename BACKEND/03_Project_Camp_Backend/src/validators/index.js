import { body } from "express-validator";
import { AvailableUserRole } from "../utils/constant.js";

const userRegistervalidaor = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username Must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long"),

    body("password").trim().notEmpty().withMessage("Password is required"),

    body("fullName").trim().optional(),
  ];
};
const userLoginValidate = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userChangedCurrentPasswordValidator = () => {
  return [
    body("oldPassword").isEmpty().withMessage("Old password is required"),
    body("newPassword").isEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [body("newPassword").isEmpty().withMessage("Password is required")];
};

const createProjectValidators = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),

    body("description").optional(),
  ];
};

const addMemberToProjectValidators = () => {
  return [
    body("email")
      .trim()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is Invalid"),
  ];
};

export {
  userRegistervalidaor,
  userLoginValidate,
  userChangedCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  createProjectValidators,
  addMemberToProjectValidators,
};
