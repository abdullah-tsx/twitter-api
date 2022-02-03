const {body} = require("express-validator");
module.exports = body('phoneNumber').custom((value, {req}) => {
    if (!value) return true;

    if (!value.isNumeric({no_symbols: true})) throw new Error("Invalid Phone Number");

    return true;
})