const {createError} = require("../util/createErrorResponse");
const User = require("../models/User");
const Interactions = require("../models/Interactions");

exports.follow = async (req, res, next) => {

    const smithId = req.user.userId;
    const johnId = req.params.id;

    try {
        const smith = await Interactions.findOne({userId: smithId});
        if (!smith) throw createError({statusCode: 404, message: 'user not found'});
        if (smith.following.includes(johnId)) {
            smith.following = smith.following.filter(id => id.toString() !== johnId);
        } else {
            smith.following.push(johnId);
        }

        const john = await Interactions.findOne({userId: johnId});

        if (john.followers.includes(smithId)) {
            john.followers = john.followers.filter(id => id.toString() !== smithId);
        } else {
            john.followers.push(smithId);
        }

        const followingStatus = await smith.save();
        const followerStatus = await john.save();

        res.status(200).json({followingStatus, followerStatus});

    } catch (err) {
        next(createError(err));
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (id.toString() !== req.user.userId.toString()) throw createError({
            statusCode: '401',
            message: 'Not allowed to delete this user'
        });

        const result = await User.deleteOne({_id: id});

        if (!result) throw createError({});

        res.status(200).json({status: 200, message: result});

    } catch (err) {
        next(createError(err));
    }
}

exports.updateUser = async (req, res, next) => {
    const id = req.user.userId;

    const name = req.body.name || null;
    const username = req.body.username || null;
    const dateOfBirth = req.body.dateOfBirth || null;
    const email = req.body.email || null;
    const phoneNumber = req.body.phoneNumber || null;
    const bio = req.body.bio || null;
    const website = req.body.website || null;
    const profilePicture = req.body.profilePicture || null;
    const coverPicture = req.body.coverPicture || null;

    try {
        const user = await User.findById(id);
        
        user.name = name ? name : user.name;
        user.username = username ? username : user.username;
        user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
        user.email = email ? email : user.email;
        user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
        user.bio = bio ? bio : user.bio;
        user.website = website ? website : user.website;
        user.profilePicture = profilePicture ? profilePicture : user.profilePicture;
        user.coverPicture = coverPicture ? coverPicture : user.coverPicture;

        const result = await user.save();

        res.status(200).json({status: 200, message: "User updated Successfully", result: result});

    } catch (err) {
        next(createError(err));
    }
}