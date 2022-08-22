const Channels = require('../models/channels');

module.exports = async (guild, message) => {
  const channelExists = await Channels.findOne({
    guildId: guild.id,
    channelName: 'logs',
  });
  if (channelExists) {
    const channel = await guild.channels.fetch(channelExists.channelId);
    console.log(message);
    channel.send(message);
    return;
  } else {
    return;
  }
};
