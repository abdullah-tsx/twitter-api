const mongoose = require('mongoose');
const {isEmail} = require("validator");

const Interactions = require('./Interactions');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: [true, 'Full name is required'],
        required: true
    },
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: 'Username should be Unique',
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email Address is required'],
        unique: 'Email Address already exists',
        validate: [isEmail, "Invalid Email Address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Birthday is required']
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String
    },
    profilePicture: {
        type: String,
        default: '/images/default_pfp.png'
    },
    coverPicture: {
        type: String,
        default: '/images/default_cover.png'
    },
    phoneNumber: {
        type: Number
    },

    likedTweets: [{type: Schema.Types.ObjectId, ref: 'Tweet'}],

    interactions: {
        type: Schema.Types.ObjectId,
        ref: 'Interactions'
    }

}, {timestamps: true});

userSchema.pre('deleteOne', async function (next) {
    const id = this._conditions._id;

    const toBeDeleted = await Interactions.findOne({userId: id}).populate(['following', 'followers']);

    for (const user of toBeDeleted.following) {
        const hasFollowerToBeDeleted = await Interactions.findOne({userId: user._id});
        hasFollowerToBeDeleted.followers = hasFollowerToBeDeleted.followers.filter(item => item.toString() !== id.toString());
        await hasFollowerToBeDeleted.save();
    }

    for (const user of toBeDeleted.followers) {
        const followingToBeDeleted = await Interactions.findOne({userId: user._id});

        followingToBeDeleted.following = followingToBeDeleted.following.filter(item => item.toString() !== id.toString());
        await followingToBeDeleted.save();
    }

    await Interactions.deleteOne({userId: id});

    next();
});

module.exports = mongoose.model('user', userSchema);