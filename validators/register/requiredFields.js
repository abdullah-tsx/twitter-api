const {body} = require("express-validator");
module.exports = [
    body('email', 'Email is required').exists({checkFalsy: true}),
    body('password', 'Password is required').exists({checkFalsy: true}),
    body('confirmPassword', 'Confirm Password is required').exists({checkFalsy: true}),
    body('username', 'Username is required').exists({checkFalsy: true}),
    body('dateOfBirth', 'Date of Birth is required').exists({checkFalsy: true}),
]