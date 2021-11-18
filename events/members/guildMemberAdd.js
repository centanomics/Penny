// Does something when a user joins a guild.
const { Invite } = require('discord.js');
const Defaults = require('../../models/defaults');
const Invites = require('../../models/invites');
const sendLog = require('../../utils/sendLog');

module.exports = async (client, member) => {
  try {
    const invitesArr = await member.guild.invites.fetch();
    const newInvites = Array.from(invitesArr.values());
    const oldInvites = await Invites.find({ guildId: member.guild.id });
    let code = '';

    for (let i = 0; i < oldInvites.length; i++) {
      if (oldInvites[i].uses !== newInvites[i].uses) {
        code = oldInvites[i].inviteId;
        const inviteFields = {};
        inviteFields.uses = newInvites[i].uses;
        // update record in database
        await Invites.findByIdAndUpdate(
          code,
          { $set: inviteFields },
          { new: true }
        );
      }
    }

    const defaultRole = await Defaults.findOne({
      guild: member.guild.id,
      roleType: 'default',
    });
    await member.roles.add(defaultRole.roleId);

    sendLog(
      member.guild,
      `\`${member.user.tag}\` as been added from \`${code}\` invite`
    );

    member.guild.systemChannel.send(
      `<@${member.user.id}> has been added to the collection. Welcome!`
    );
  } catch (err) {
    console.log(err.message);
  }
};
