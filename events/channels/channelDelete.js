// deletes a channel from the database when you delete a channel in the guild
// if it exists of course
const Channels = require('../../models/channels');

module.exports = async (client, channel) => {
  const deletedChannel = await Channels.findOne({
    guildId: channel.guildId,
    channelId: channel.id,
  });

  if (deletedChannel) {
    await Channels.findByIdAndDelete(deletedChannel._id);
  }
};
