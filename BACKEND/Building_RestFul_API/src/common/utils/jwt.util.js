import crypto from 'crypto';
import jwt from "jsonwebtoken"

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN || '15m'
    })
}
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN || '7d'
    })
}
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET)
}



const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    return { rawToken, hashedToken };
}

export { generateResetToken, verifyAccessToken, generateAccessToken, generateRefreshToken, verifyRefreshToken };