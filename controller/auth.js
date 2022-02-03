const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/User');
const Interactions = require("../models/Interactions");
const {createError} = require("../util/createErrorResponse");

exports.login = async (req, res, next) => {

    const account = req.body.login;
    const password = req.body.password;

    try {
        const user = await User.findOne({$or: [{email: account}, {username: account}]}).select({email: 1, password: 1});

        if (!user) {
            throw createError({statusCode: 404, message: 'user not found'});
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw createError({statusCode: 401, message: 'Invalid Password.'});
        }

        jwt.sign({
            email: user.email,
            userId: user._id.toString(),
        }, process.env.JWT_ACCESS_TOKEN_SEC, {}, (err, token) => {
            if (!err) {
                return res.status(200).json({statusCode: 200, message: 'user Signed in Successfully', token});
            }
            return createError({statusCode: err.statusCode, message: err.message});
        });

    } catch (error) {
        next(createError(error));
    }
}

exports.register = async (req, res, next) => {

    const {email, name, username, dateOfBirth, password} = req.body;

    const user = new User({
        email: email,
        password: await bcrypt.hash(password, 12),
        dateOfBirth: dateOfBirth,
        username: username,
        name: name
    });

    const interactions = new Interactions({
        userId: user._id,
    });

    user.interactions = interactions._id;

    try {
        await interactions.save();
        const result = await user.save();
        res.status(200).json({status: 200, message: 'user Created!', user: result});
    } catch (error) {
        next(createError(error));
    }
}