const sendLog = require('../../utils/sendLog');

// sends a log when a user leaves a guild
module.exports = async (client, member) => {
  sendLog(`\`${member.user.tag}\` has left the guild`);
};
