const {isValidObjectId} = require("mongoose");
const {createError} = require("../util/createErrorResponse");


module.exports = (req, res, next) => {
    
    if (!isValidObjectId(req.params.id)) throw createError({
        statusCode: '404',
        message: 'Not found',
        errorInfo: 'Invalid parameter'
    });
    return next();
}