import * as authService from './auth.service.js';
import ApiResponse from '../../common/utils/api-response.js';
import cookie from 'cookie-parser'
import ApiError from '../../common/utils/api-error.js';

const register = async (req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, 'User registered successfully', user);
}

const login = async (req, res) => {
    const {userObj, accessToken, refreshToken} = await authService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7*24*60*60*1000
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15*60*1000
    })

    ApiResponse.ok(res, "Login Successfull", {userObj, accessToken, refreshToken});
}

const logout = async (req, res) => {
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken")

    ApiResponse.ok("Logout Successful")
}

const getMe = async (req, res) => 
{
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", user);
}

const verifyEmail = async (req, res) => {
    const user = await authService.verifyEmail(req.query.token);
    ApiResponse.ok(res, "Email Verified Successfully", user);
}

const forgotPassword = async (req, res) => {
    await authService.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Reset Password Link Sent to your Email");
}

const resetPassword = async (req, res) => {
    const response = await authService.resetPassword(req.body);
    ApiResponse.ok(res, response.message);
}


const uploadAvatar = async(req, res) => {
    try {
        const file = req.file;
        if(!file) {
            return ApiError.badRequest("File not found");
        }

        const result = await authService.avatarUpload(req.user.id, file)

        return ApiResponse.ok(res, "File uploaded successfully", {avatarUrl: result.url})
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message: error.message
    });
    }
}

export {register, login, logout, getMe, verifyEmail, forgotPassword, resetPassword, uploadAvatar};