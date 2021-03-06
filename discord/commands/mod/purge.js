// @command     purge
// @desc        removes a set amount of messages
// @access      moderators
module.exports = {
  name: 'purge',
  description: 'purges a number of messages, max 100',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    try {
      const n = args[0];
      await message.channel.bulkDelete(n);
      message.channel.send(`Purged ${n} message(s).`).then((message) => {
        message.delete();
      });
    } catch (err) {
      message.channel.send(err.message);
    }
  },
};
