const mongoose = require('mongoose');
const uuid = require('uuid');

const InivteSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
    required: true,
  },
  inviteId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('invites', InivteSchema);
