const express = require('express');
const {validationResult} = require('express-validator');

const {createError} = require("../util/createErrorResponse");

const validateRequest = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => {
            return {field: e.param, message: e.msg}
        });
        throw(createError({statusCode: 422, message: 'Validation Error', errorInfo: errorMessages}));
    }

    next();
}

module.exports = validateRequest;
