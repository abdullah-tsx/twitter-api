const {body} = require("express-validator");
module.exports = body('confirmPassword').custom((value, {req}) => {
    if (value !== req.body.password) {
        throw new Error("Password & Confirm Password must be same");
    }
    return true;
})