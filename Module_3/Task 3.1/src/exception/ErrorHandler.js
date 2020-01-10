class ErrorHandler extends Error {
    constructor(status = 500, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorHandler);
        }
        this.status = status;
    }
}

export default ErrorHandler;
