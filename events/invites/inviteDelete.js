const Invites = require('../../models/invites');

const sendLog = require('../../utils/sendLog');

module.exports = async (client, invite) => {
  try {
    const toDelete = await Invites.findOne({ inviteId: invite.code });
    await Invites.findByIdAndDelete(toDelete._id);

    sendLog(invite.guild, `Invite \`${invite.code}\` deleted`);
  } catch (err) {
    console.log(err.message);
  }
};
