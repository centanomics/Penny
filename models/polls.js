const mongoose = require('mongoose');
const uuid = require('uuid');

const DefaultSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    messageUrl: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    pollName: {
        type: String,
        required: true,
    },
    pollArgs: {
        type: Array,
        required: true,
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model('polls', DefaultSchema);
