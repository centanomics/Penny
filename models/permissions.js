const mongoose = require('mongoose');
const uuid = require('uuid');

const PermissionsSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4(),
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  permissionName: {
    type: String,
    required: true,
  },
  allowed: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model('permissions', PermissionsSchema);
