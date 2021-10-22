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
      const hasPerm = await checkPerms('create-channels', message.guildId);
      if (!hasPerm) {
        throw {
          message: "You guild doesn't have the create-channels permission on!",
        };
      }
      // const logChannel = await Channels.findOne({
      //   guildId: message.guildId,
      //   name: 'logs',
      // });
      // if (!logChannel) {
      //   const newChannel = await message.guild.channels.create('logs');
      //   const channelFields = new Channels({
      //     guildId: message.guildId,
      //     channelId: newChannel.id,
      //     channelName: newChannel.name,
      //   });
      //   await channelFields.save();
      // } else {
      //   console.log('delete log channel!');
      // }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  },
};
