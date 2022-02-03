const {body} = require("express-validator");
const User = require("../../models/User");

module.exports = body('username').custom((value, {req}) => {
    return User.exists({username: value}).then(exists => {
        if (exists) {
            return Promise.reject("user already exists");
        }
    });
})