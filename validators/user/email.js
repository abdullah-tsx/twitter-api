const {body} = require("express-validator");
const {isEmail} = require("validator");
const User = require("../../models/User");

module.exports = body('email').custom((value, {req}) => {

    if (!value) return true;

    if (!isEmail(value)) {
        throw new Error("Please enter a valid email address");
    }
    return User.exists({email: value}).then(exists => {
        if (exists) {
            return Promise.reject("Email already exists");
        }
    })
})