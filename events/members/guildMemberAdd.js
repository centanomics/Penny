// Does something when a user joins a guild.
const Defaults = require('../../models/defaults');

module.exports = async (client, member) => {
  try {
    const defaultRole = await Defaults.findOne({ guild: member.guild.id });
    await member.roles.add(defaultRole.roleId);

    member.guild.systemChannel.send(
      `<@${member.user.id}> has been added to the collection. Welcome!`
    );
  } catch (err) {
    console.log(err.message);
  }
};
