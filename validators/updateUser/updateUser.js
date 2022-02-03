const emailValidator = require("../user/email");
const nameValidator = require("../user/name");
const usernameValidator = require("../user/username");
const birthdayValidator = require("../user/birthday");
const phoneValidator = require("../user/phoneNumber");
const bioValidator = require("../user/bio");
const websiteValidator = require("../user/website");
const profilePicValidator = require("../user/profilePic");
const coverPicValidator = require("../user/coverPic");

module.exports = [
    emailValidator,
    nameValidator,
    usernameValidator,
    birthdayValidator,
    phoneValidator,
    bioValidator,
    websiteValidator,
    profilePicValidator,
    coverPicValidator
]