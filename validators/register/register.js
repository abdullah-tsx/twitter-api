const emailValidator = require("../user/email");
const nameValidator = require("../user/name");
const usernameValidator = require("../user/username");
const passwordsValidator = require("../user/password");
const confirmPasswordValidator = require("../user/confirmPassword");
const birthdayValidator = require("../user/birthday");


module.exports = [
    emailValidator,
    nameValidator,
    usernameValidator,
    passwordsValidator,
    confirmPasswordValidator,
    birthdayValidator
]