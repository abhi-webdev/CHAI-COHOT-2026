import * as crypto from "crypto"
import { sendVerificationEmail } from "../../common/config/email.js";
import ApiError from "../../common/utils/api-error.js";
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "../auth/auth.model.js";

const hashedToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email });
    if (existing) {
        throw ApiError.conflict("Email already exist");
    }

    const { rawToken, hashedToken } = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    });

    // send an email to user with token : rawToken

    try {
        await sendVerificationEmail(email, rawToken)
    } catch (error) {
        console.log(error);
    }

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return userObj;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw ApiError.unAuthorized("Invalid email and password");

    // check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw ApiError.unAuthorized("Invalid email or password")

    if (!user.isVerified)
        throw ApiError.forbidden("Please verify you email before login");

    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashedToken(refreshToken);

    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
    if (!token) throw ApiError.unAuthorized("Refresh token missing");
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user) throw ApiError.unAuthorized("User not found");

    if (user.refreshToken !== hashedToken(token)) {
        throw ApiError("Invalid refresh token");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    user.accessToken = hashedToken(accessToken);

    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.accessToken;

    return { user: userObj, accessToken, refreshToken };
};

const logout = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw ApiError.unAuthorized("User not found");
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
};

const forgotPassword = async (email) => {
    const user = await User.findOne({email});
    if(!user) throw ApiError.notFound("No account with that email")

        const {rawToken, hashedToken} =  generateResetToken()

        user.resetPasswordToken = hashedToken
        user.resetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save()

        // TODO : mail send
        
}

const verifyEmail = async (token) => {
    const hashedToken = hashedToken(token)

    const user = await User.findOne({verificationToken : hashedToken}).select("+verificationToken")
    if(!user) ApiError.notFound("User not found")
        user.isVerified = true
    user.verificationToken = undefined

    await user.save()
    return user

}

const getMe = async (userId) => {
    const user = await User.findById(userId)
    if(!user) throw ApiError.notFound("User not found")
        return user
}

export { register, login, refresh, logout, forgotPassword,verifyEmail, getMe };
