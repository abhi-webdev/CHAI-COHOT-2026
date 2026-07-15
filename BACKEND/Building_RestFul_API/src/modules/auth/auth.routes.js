
import {Router} from 'express';
import * as authController from './auth.controller.js';
import validate from '../../common/middleware/validate.middleware.js';
import RegisterDto from './dto/register.dto.js';
import { authenticate } from './auth.middleware.js';
import LoginDto from './dto/login.dto.js';
import { upload } from '../../common/middleware/multer.js';

const router = Router();

router.post('/register',validate(RegisterDto), authController.register);
router.post('/login', validate(LoginDto), authController.login)
router.get('/me', authenticate, authController.getMe)
router.get('/logout', authenticate, authController.logout)
router.get('/verifyEmail/:token', authController.verifyEmail)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)

router.post('/avatar', authenticate, upload.single("Avatar"), authController.uploadAvatar)

export default router;