import {body} from "express-validator"

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
            .isLength({min : 3})
            .withMessage("Username must be atleast 3 characters long"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
            
        body("fullName")
            .trim()
            .optional()
    ]
}
const userLoginValidate = () => {
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
         
    ]
}


export {userRegistervalidaor, userLoginValidate}