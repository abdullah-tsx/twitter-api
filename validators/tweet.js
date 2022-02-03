const {body} = require("express-validator");

const User = require("../models/User");
const {isValidObjectId} = require("mongoose");

module.exports = [
    body('content').custom((value, {req}) => {
        if (!req.body.content && !req.body.media && !req.body.originalTweet) {
            throw new Error("Cannot add empty tweet.");
        }

        if (req.body.isReply && !req.body.content && !req.body.media) {
            throw new Error("Cannot add empty tweet")
        }

        if (value?.trim().length > 500) {
            throw new Error("Maximum number of characters (500) exceeded.");
        }

        return true;
    }),
    body('originalTweet').custom((value, {req}) => {
        if ((req.body.isReply || req.body.isRetweet) && !req.body.originalTweet) {
            throw new Error("Original tweet ID cannot be blank.");
        }

        if (!isValidObjectId(value)) {
            throw new Error("Invalid Parent Tweet ID");
        }

        if (!req.body.isRetweet && !req.body.isReply && req.body.originalTweet) {
            throw new Error("isReply and isRetweet Flags cannot be undefined");
        }

        return true;
    })
]