import Joi from "joi";

class BaseDto{
    static schema = Joi.object({})

    static validate(data) {
    const { error, value } = this.schema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    })

    if (error) {
        const messages = error.details.map((d) => d.message)
        return { errors: messages, value: null }
    }

    return { errors: null, value }
}
}

export default BaseDto;