const {body} = require("express-validator");
const {isURL} = require("validator");
module.exports = body('coverPicture').custom((value, {req}) => {
    if (!value) return true;

    if (!isURL(value)) throw new Error("Please enter valid URL");

    return true;
})