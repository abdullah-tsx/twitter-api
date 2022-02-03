const jwt = require('jsonwebtoken');
const {createError} = require("../util/createErrorResponse");
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({status: 403, message: "Authentication Required"});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SEC, (err, user) => {
        if (err) next(createError(err));
        req.user = user;
        next();
    })
}