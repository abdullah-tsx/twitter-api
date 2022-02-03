exports.createError = (err) => {
    const errors = [];
    const error = new Error(err.message || "Something Went Wrong!!");
    error.errorInfo = err.errorInfo;
    error.statusCode = err.statusCode || 500;

    if (err.message.includes('validation failed')) {
        error.statusCode = 422;

        Object.values(err.errors).forEach(e => {
            errors.push({type: e.path, message: e.message});
        })
        error.errorInfo = errors;
        error.message = "Validation Failed";
    }

    if (err.message.includes("jwt expired")) {
        error.statusCode = 401;
        error.message = "Invalid JWT Token";
    }

    return error;
}