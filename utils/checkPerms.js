// checks to see if guild has a specific perm activated
const Permissions = require('../models/permissions');

module.exports = async (permissionName, guildId) => {
  try {
    const permToCheck = await Permissions.findOne({ guildId, permissionName });
    if (!permToCheck) {
      return false;
    }

    if (permToCheck.allowed === false) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err.message);
  }
};
