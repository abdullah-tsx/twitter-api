const {body} = require("express-validator");
module.exports =
    body('password', 'Password should be at least 6 characters').isLength({min: 6})