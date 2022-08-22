const sendLog = require('../../utils/sendLog');

// sends a log when a user leaves a guild
module.exports = async (client, member) => {
  try {
    sendLog(member.guild, `\`${member.user.tag}\` has left the guild`);
  } catch (err) {
    console.log(err.message);
  }
};
