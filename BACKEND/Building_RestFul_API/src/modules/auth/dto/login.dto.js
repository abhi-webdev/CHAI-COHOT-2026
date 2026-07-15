import joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class LoginDto extends BaseDto {
    static schema = joi.object({
        email: joi.string().email().required().trim().lowercase().required(),
        password: joi.string().required().trim().min(6).message("Password must be at least 6 characters long")
    })
}

export default LoginDto;