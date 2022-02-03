const Tweet = require("../models/Tweet");
const User = require("../models/User");
const {createError} = require("../util/createErrorResponse");

exports.createTweet = async (req, res, next) => {

    const content = req.body.content;
    const author = req.user.userId;
    const originalTweet = req.body.originalTweet;
    const media = req.body.media;
    const isRetweet = req.body.isRetweet;
    const isReply = req.body.isReply;

    const response = {};


    const tweet = new Tweet({content, author, originalTweet, media, isRetweet, isReply});

    try {
        response.result = await tweet.save();
        if (!response.result) {
            throw createError({message: response.result});
        }

        if (isReply) {
            const parentTweet = await Tweet.findById(originalTweet);
            if (!parentTweet) {
                throw createError({statusCode: 404, message: 'Original tweet not found'})
            }
            parentTweet.replies.push(tweet._id);
            response.originalTweet = await parentTweet.save();
        }

        if (isRetweet) {
            const parentTweet = await Tweet.findById(originalTweet);
            if (!parentTweet) {
                throw createError({statusCode: 404, message: 'Original tweet not found'})
            }
            parentTweet.retweets.push(tweet._id);

            response.originalTweet = await parentTweet.save();
        }

    } catch (error) {
        return next(createError(error));
    }

    res.status(200).json({status: 200, data: response});
}

exports.timeline = async (req, res, next) => {

    const page = req.query.page;
    const limit = req.query.limit;

    const options = {
        page: +page,
        limit: +limit,
        sort: {createdAt: -1},
        select: {__v: 0},
        populate: {path: 'author', select: ['name', 'username', 'profilePicture']}
    }

    try {
        const result = await Tweet.paginate({}, options);

        if (!result) {
            throw createError({});
        }

        res.status(200).json({status: 200, ...result});

    } catch (err) {
        next(createError(err));
    }
}

exports.singleTweet = async (req, res, next) => {
    const id = req.params.id;

    try {
        let tweet;
        tweet = await Tweet.findById(id)
            .populate('author', ['name', 'username', 'profilePicture']);
        if (!tweet) {
            console.log('throwing error');
            throw createError({statusCode: 404, message: 'Tweet not found'});
        }

        res.status(200).json({status: 200, tweet: tweet});

    } catch (err) {
        next(createError(err));
    }
}

exports.like = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.userId;
    let operation;
    try {
        const tweet = await Tweet.findById(id);
        const user = await User.findById(userId);

        if (tweet.likes.includes(userId)) {
            tweet.likes = tweet.likes.filter(uid => uid.toString() !== userId);
            operation = 'Un-Like';
        } else {
            operation = 'Like';
            tweet.likes.push(userId);
        }

        if (user.likedTweets.includes(id)) {
            user.likedTweets = user.likedTweets.filter(tid => tid.toString() !== id);
        } else {
            user.likedTweets.push(id);
        }

        await tweet.save();
        await user.save();

        res.status(200).json({status: 200, operation: operation, tweet: tweet});
    } catch (err) {
        console.log(err);
        next(createError(err));
    }
}

exports.delete = async (req, res, next) => {
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    const likes = tweet.likes;

    try {
        for (const like of likes) {
            const user = await User.findById(like);
            user.likedTweets = user.likedTweets.filter(id => id.toString() !== tweetId.toString());
            const removed = await user.save();
            if (!removed) {
                throw createError({status: 500, message: 'Could not delete', errorInfo: removed})
            }
        }
        const deleteResult = await Tweet.deleteOne({_id: tweetId});

        if (!deleteResult) {
            throw createError({status: 500, message: 'Could not delete', errorInfo: deleteResult})
        }

    } catch (err) {
        next(createError(err));
    }

    res.status(200).json({status: 200, message: 'Tweet deleted successfully'});
}