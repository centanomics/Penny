const Invites = require('../../models/invites');

const sendLog = require('../../utils/sendLog');

module.exports = async (client, invite) => {
  try {
    const newInvite = new Invites({
      inviteId: invite.code,
      guildId: invite.guild.id,
    });

    await newInvite.save();
    sendLog(
      invite.guild,
      `Invite \`${invite.code}\` created by \`${invite.inviter.tag}\``
    );
  } catch (err) {
    console.log(err.message);
  }
};
