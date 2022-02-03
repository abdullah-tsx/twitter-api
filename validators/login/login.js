const {body} = require("express-validator");
module.exports = [
    body('login', 'Please enter a valid username or email address').exists({checkFalsy: true}),
    body('password', 'Password is required').exists({checkFalsy: true}),
]