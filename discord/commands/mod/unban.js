// @command     unban
// @desc        unbans a user
// @access      moderators
module.exports = {
  name: 'unban',
  description: 'revokes a users ban',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    await message.guild.members.unban(args[0]);
  },
};
