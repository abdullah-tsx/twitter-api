exports.error = (err, req, res, next,) => {

    //console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Unexpected Server error";
    const errorInfo = err.errorInfo;
    res.status(statusCode).json({status: statusCode, message: message, errorInfo: errorInfo}).end();
}