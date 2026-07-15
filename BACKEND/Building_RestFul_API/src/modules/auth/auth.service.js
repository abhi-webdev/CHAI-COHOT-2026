import { sendVerificationEmail } from '../../common/config/email.js';
import imagekit from '../../common/config/imagekit.js';
import ApiError from '../../common/utils/api-error.js';
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from '../../common/utils/jwt.util.js';
import User from './auth.model.js';
import fs from 'node:fs';
import crypto from 'node:crypto';

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');


const register = async ({ name, email, password, role }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError.conflict('User already exists with this email');
  }

  const { rawToken, hashedToken } = generateResetToken();

  const newUser = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  // Todo : send email to the user with token : raw Token

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (error) {
    console.log(error);
  }

  const userObj = newUser.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({email}).select('+password');

  if (!user) {
    throw ApiError.unauthorized('Invalid Email and Password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized('Invalid email and password');

//   if (!user.isVerified) {
//     throw ApiError.forbidden('User not Verified');
//   }

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);

  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  console.log(accessToken);
  
  return { userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) {
    throw ApiError.unauthorized('Refresh token missing');
  }

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded._id).select('+refreshToken');
  if (!user) {
    throw ApiError.unauthorized('user not found');
  }

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized('Invalid Token');
  }
  const accessToken = generateAccessToken({ id: user._id });

  return { accessToken };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const { rawToken, hashedToken } = generateResetToken();

  user.resetPasswordToken = hashToken;
  user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

  await user.save();

  // Todo : Mail bhejna nhi aata
};

const resetPassword = async ({ token, newPassword }) => {
  if (!token && !newPassword) {
    throw ApiError.badRequest('Token and new password is required');
  }

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiry: Date.now() + 15 * 60 * 1000,
  });

  if (!user) {
    throw ApiError.unauthorized('User token unmatched and expired');
  }

  user.password = newPassword;

  resetPasswordToken = undefined;
  resetPasswordExpiry = undefined;

  await user.save();

  return {
    message: 'Reset password successfully',
  };
};

const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({ verificationToken: hashedToken }).select(
    '+verificationToken',
  );

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.isVerified = true;
  user.verificationToken = undefined;

  await user.save();

  return user;
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');

  return user;
};

const avatarUpload = async (userId, file) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const uploadResponse = await imagekit.files.upload({
      file: fileStream,
      fileName: file.filename,
      folder: '/user-avatars',
    });

    await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadResponse.url,
      },
      { new: true },
    );

    fs.unlinkSync(file.path)
    
    return {
        url : uploadResponse.url,
        fileId: uploadResponse.fileId
    }
  } catch (error) {
    try {
        if (file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
        }
    } catch (error) {
        console.log("Error deleting temporary file", err);
    }

    throw error
  }
};

export {
  register,
  login,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getMe,
  avatarUpload,
};
