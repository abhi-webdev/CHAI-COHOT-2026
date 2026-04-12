class ApiError extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
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

    static forbidden(message = "forbidden"){
        return new ApiError(403, message)
    }

    static notFound(message = "notFound"){
        return new ApiError(403, message)
    }
}


export default  ApiError;