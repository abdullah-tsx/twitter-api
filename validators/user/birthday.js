const {body} = require("express-validator");

const {parse, differenceInYears, isValid} = require("date-fns");
module.exports =
    body('dateOfBirth').custom((value, {req}) => {
        if (!value) return true;

        const dateOfBirth = parse(value, "dd-MM-yyyy", new Date());

        if (!isValid(dateOfBirth)) throw  new Error("Please enter a valid date. (dd-mm-yyyy)");

        const age = differenceInYears(new Date(), dateOfBirth);
        if (age < 13) throw new Error("You must be at least 13 years old!!");
        return true;

    })