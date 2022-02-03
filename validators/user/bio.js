const {body} = require("express-validator");
module.exports =
    body('bio').custom((value, {req}) => {
        if (!value) return true;

        if (value.length > 20) throw new Error("Max Characters (20) exceeded");

        return true;
    })