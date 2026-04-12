import Joi from "joi"
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto {
    static schema = Joi.object({
        email : Joi.string().email().lowercase().required(),
        password : Joi.string().min(6).required().messages({"string.min": "Password must contain at least 6 characters",
            "any.required": "Password is required"}),
    })
}

export default LoginDto;