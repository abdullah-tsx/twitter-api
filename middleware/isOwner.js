const Tweet = require("../models/Tweet");
const {createError} = require("../util/createErrorResponse");
const {isValidObjectId} = require("mongoose");

const isOwner = async (req, res, next) => {

    const tweetId = req.params.id;

    if (!isValidObjectId(tweetId)) throw createError({statusCode: 404, message: 'Tweet not found'});

    try {
        if (await Tweet.exists({_id: tweetId, author: req.user.userId})) return next();
        throw createError({statusCode: 403, message: 'Cannot delete someone else\'s tweet'});
    } catch (err) {
        next(createError(err));
    }
}

module.exports = isOwner;