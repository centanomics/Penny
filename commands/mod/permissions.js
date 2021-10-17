// @command     permissions
// @desc        Manages permissions for the bot
// @access      mod

const Permissions = require('../../models/permissions');

module.exports = {
  name: 'permissions',
  description: 'This makes the bot reply pong!',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    const perms = await Permissions.find({ guildId: message.guildId });
    console.log(perms);
    // if perms don't exist for this guild, add them
    if (perms.length === 0) {
      const newPerm = new Permissions({
        guildId: message.guildId,
        permissionName: 'Create Channels',
        allowed: false,
      });

      await newPerm.save();
      message.channel.send(
        'Created Permissions for this server! Try using the permissions command again!'
      );
    } else {
      message.channel.send('List of permissions');
    }
  },
};
