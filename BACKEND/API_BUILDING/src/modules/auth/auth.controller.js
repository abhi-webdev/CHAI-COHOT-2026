import * as authService  from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js"
import cookie from "cookie-parser";

const register = async (req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user)

}

const login = async (req, res) => {
    const {user, accessToken, refreshToken} = await authService.login(req.body);
    
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : true,
        maxAge : 7*24*60*60*1000  // 7 day,
    })
    ApiResponse.ok(res, "Login success", {user, accessToken})

    
}

const logout = async (req, res) => {
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken")

    ApiResponse.ok(res, "Logout success")
}

const verifyEmail = async (req, res) => {
    const {token} = req.params;
    await authService.verifyEmail(token)
    ApiResponse.ok(res, "Email Verified successfully")
}

const getMe = async (req, res) => {
    const userId = await authService.getMe(req.user.id)
    ApiResponse.ok(res, "User Profile", userId)
    
}


export {register, login, logout,verifyEmail, getMe}