// Does something when a user joins a guild.
const Defaults = require('../../models/defaults');
const sendLog = require('../../utils/sendLog');

module.exports = async (client, member) => {
  try {
    const defaultRole = await Defaults.findOne({
      guild: member.guild.id,
      roleType: 'default',
    });
    await member.roles.add(defaultRole.roleId);

    // sendLog(client, defaultRole.guildId, 'User as been added');

    member.guild.systemChannel.send(
      `<@${member.user.id}> has been added to the collection. Welcome!`
    );
  } catch (err) {
    console.log(err.message);
  }
};
