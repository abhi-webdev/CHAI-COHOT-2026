
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2,
        required : [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        required : [true, "email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        required : [true, "Password is required"],
        select: false
    },
    role: {
        type: String,
        enum: ["customer","seler", "admin"],
        default: "customer"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar : {
        type : String,
        default : false
    },
    verificationToken: {
        type: String,
        select: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpiry: {
        type: Date,
        select: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (req, res, next) {
    if(!this.isModified("password")) return next
    this.password = await bcrypt.hash(this.password, 12)

    return next
})

userSchema.methods.comparePassword = async function (clearTextPassword) {
    return await bcrypt.compare(clearTextPassword, this.password)
}

export default mongoose.model("User", userSchema);