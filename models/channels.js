const mongoose = require('mongoose');
const uuid = require('uuid');

const ChannelsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('channels', ChannelsSchema);
