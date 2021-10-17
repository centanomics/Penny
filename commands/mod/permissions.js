// @command     permissions
// @desc        Manages permissions for the bot
// @access      mod

const Discord = require('discord.js');

const Permissions = require('../../models/permissions');

module.exports = {
  name: 'permissions',
  description: 'This makes the bot reply pong!',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    const perms = await Permissions.find({ guildId: message.guildId });
    // if perms don't exist for this guild, add them
    if (perms.length === 0) {
      const newPerm = new Permissions({
        guildId: message.guildId,
        permissionName: 'create-channels',
        description: 'Allows the bot to create channels.',
        allowed: false,
      });

      await newPerm.save();
      message.channel.send(
        'Created Permissions for this server! Try using the permissions command again!'
      );
    } else {
      const msgEmbed = new Discord.MessageEmbed()
        .setTitle('Penny Permissions')
        .setFooter(message.author.username, message.author.avatarURL());
      for (let i = 0; i < perms.length; i++) {
        msgEmbed.addField(perms[i].permissionName, perms[i].description, true);
      }

      message.channel.send({ embeds: [msgEmbed] });
    }
  },
};
