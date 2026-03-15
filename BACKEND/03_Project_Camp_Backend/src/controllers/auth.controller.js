import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Somthing went wrong while generating access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, role, password} = req.body
    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with this username and email already exist", [])
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({validateBeforeSave : false});

    await sendEmail({
        email : user?.email,
        subject : "Please verify your email",
        mailgenContent : emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        ),
    }) 

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    if(!createdUser){
        throw new ApiError(500, "somthing went wrong while regestring the user")
    }

    res.status(200).json(
        new ApiResponse(200, {user: createdUser}, "User registred successfully and verification email sent to your email")
    )
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email && !password) {
        throw new ApiError(400, "Email and password is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "User doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid credentials")
    }

    const {accessToken, refreshToken} =  await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user : loggedInUser, 
            accessToken, 
            refreshToken
        }, "User loggedIn successfully"))
})

const logout = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : ""
            }
        },
        {
            returnDocument : "after"
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged out")
        )
})

export {registerUser, login, logout}