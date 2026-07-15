import BaseDto from "../dto/base.dto.js";
import ApiError from "../utils/api-error.js";

const validate = (BaseDto) => {
    return (req, res, next) => {
        const {errors, value} = BaseDto.validate(req.body)

        if (errors) {
            throw ApiError.badRequest(errors.join("; "));

        }

        req.body = value;

        next()
    }
}


export default validate;