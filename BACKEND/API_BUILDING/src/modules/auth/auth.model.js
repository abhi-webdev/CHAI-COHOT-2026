import { boolean } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name not found"],
        trim : true,
        minLength : 2,
        maxLength : 50
    },
    email : {
        type : String,
        required : [true, "email is required"],
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type: String,
        required : [true, "Password is required"],
        minLength : 6,
        select : false
    },
    role : {
        type : String,
        enum : ["customer", "seller", "admin"],
        default : "customer"
    },
    isVerified : {
        type : boolean,
        default : false
    },
    verificationToken : {
        type : String,
        select : false
    },
    refreshToken : {
        type : String,
        select : false
    },
    resetPasswordToken : {
        type : String,
        select : false
    },
    resetPasswordTokenExpiry : {
        type : String,
        select : false
    },
}, {timestamps : true})

export default mongoose.model("User", userSchema)