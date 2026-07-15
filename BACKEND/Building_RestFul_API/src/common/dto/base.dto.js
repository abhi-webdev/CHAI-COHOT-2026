import joi from "joi"

class BaseDto {
    static schema = joi.object({})

    static validate(data) {
        const {error, value} = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error) {
            const errors = error.details.map((e) => e.message);
            return {errors, value : null};
        }

        return {value, errors : null}
    }
    
}


export default BaseDto