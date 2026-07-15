import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.util.js";
import User from "./auth.model.js"

const authenticate = async (req, res, next) => {
    let token;
    if(req.headers.authorization?.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw ApiError.unauthorized("Invalid Token");
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);

    if(!user) throw ApiError.unauthorized("Unauthorized user")

    req.user = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email
    }

    next()
} 


const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) throw ApiError.forbidden("You can not perform this action")

        next();
    }
}


export {authenticate, authorize}