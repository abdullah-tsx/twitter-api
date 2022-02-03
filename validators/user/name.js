const {body} = require("express-validator");
module.exports = body('name').custom((value, {req}) => {
    if (!value) return true;

    if (value.length < 3) throw new Error("Name must be at least 3 characters");
    if (value.length > 20) throw new Error("Name must be at most 20 characters");

    return true;
})