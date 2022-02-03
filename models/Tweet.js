const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    /*Text Content of Tweet*/
    content: {
        type: String,
        maxLength: [500, 'Character limit is exceeded']
    },
    /*URL of media e.g. pictures in tweet*/
    media: {
        type: String,
    },
    /*ID of tweeter*/
    author: {
        required: [true, "Author is Required"],
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    /*If the tweet is pinned.*/
    pinned: {
        type: Boolean,
    },
    /*List of IDs of people who have liked it*/
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    /*List of tweets that retweet*/
    retweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    /*List of tweets that are replies*/
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    /*if its reply/retweet then id of original tweet*/
    originalTweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    isRetweet: {
        type: Boolean,
        default: false
    },
    isReply: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


tweetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tweet', tweetSchema);