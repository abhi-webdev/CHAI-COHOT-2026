class ApiError extends Error{
    constructor(statusCode, message){
        super(statusCode)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.contructor)
    }

    static badRequest(message = "Bad Request"){
        return new ApiError(400, message)
    }

    static unAuthorized(message = "unAuthorized"){
        return new ApiError(401, message)
    }

    static conflict(message = "User already exist"){
        return new ApiError(409, message)
    }
}


export default  ApiError;