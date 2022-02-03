const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interactionsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true
    },
    following: [{type: Schema.Types.ObjectId, ref: 'user'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'user'}]

}, {timestamps: true});

module.exports = mongoose.model('Interactions', interactionsSchema);