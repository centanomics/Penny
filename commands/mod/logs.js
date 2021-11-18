// @command     logs
// @desc        toggles log channel
// @access      mod
const Channels = require('../../models/channels');
const checkPerms = require('../../utils/checkPerms');

module.exports = {
  name: 'logs',
  description: 'toggles log channel',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    try {
      // checks to see if user has certain perms on
      const hasPerm = await checkPerms('create-channels', message.guildId);
      if (!hasPerm) {
        throw {
          message: "You guild doesn't have the create-channels permission on!",
        };
      }
      const logChannel = await Channels.findOne({
        guildId: message.guildId,
        name: 'logs',
      });
      // if log channel doesnt exist create it and add admin only perms
      // if it does exist delete it
      if (!logChannel) {
        const newChannel = await message.guild.channels.create('logs', {
          type: 'GUILD_TEXT',
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone.id,
              deny: ['VIEW_CHANNEL'],
            },
          ],
        });

        const channelFields = new Channels({
          guildId: message.guildId,
          channelId: newChannel.id,
          channelName: newChannel.name,
        });
        await channelFields.save();
        message.channel.send(`Created a <#${newChannel.id}> channel!`);
      } else {
        const channelToDelete = await message.guild.channels.fetch(
          logChannel.channelId
        );
        await channelToDelete.delete();
        message.channel.send('Deleted the logs channel');
      }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  },
};
