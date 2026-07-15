import joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class RegisterDto extends BaseDto {
    static schema = joi.object({
        name: joi.string().required().trim().min(2).max(50),
        email: joi.string().email().required().trim().lowercase(),
        password: joi.string().required().trim().min(6).message("Password must be at least 6 characters long"),
        role: joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto;