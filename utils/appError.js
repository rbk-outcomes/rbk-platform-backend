class AppError extends Error{
    constructor(message, status, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        // to check of the the error is operational error not programming error or an error with one of the packages
        this.isOperationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;