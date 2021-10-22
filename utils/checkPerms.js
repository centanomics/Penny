// checks to see if guild has a specific perm activated
const Permissions = require('../models/permissions');

module.exports = async (permissionName, guildId) => {
  try {
    const permToCheck = await Permissions.findOne({ guildId, permissionName });
    if (!permToCheck) {
      console.log('it doesnt exist');
      return false;
    }

    if (permToCheck.allowed === false) {
      console.log('it is set to false');
      return false;
    }

    console.log('clean');
    return true;
  } catch (err) {
    console.log(err.message);
  }
};
