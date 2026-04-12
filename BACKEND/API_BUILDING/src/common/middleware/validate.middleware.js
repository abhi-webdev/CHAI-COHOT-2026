import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const {errors, value} = DtoClass.validate(req.body)
        if (errors) {
            throw ApiError.badRequest(errors.join("; "))
        }
        req.body = value
        next()
        return { errors: null, value } 
    }
}


export default validate;