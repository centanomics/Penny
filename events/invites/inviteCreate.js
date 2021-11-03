const Invites = require('../../models/invites');

module.exports = async (client, invite) => {
  try {
    const newInvite = new Invites({
      inviteId: invite.code,
      guildId: invite.guild.id,
    });

    await newInvite.save();
  } catch (err) {
    console.log(err.message);
  }
};
