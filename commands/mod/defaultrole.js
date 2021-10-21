// @command     defaultrole
// @desc        Manages permissions for the bot
// @access      mod
// #ad6f69

const Defaults = require('../../models/defaults');

module.exports = {
  name: 'defaultrole',
  description: 'Sets a default role for this server',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    try {
      const role = message.mentions.roles.first();
      const newDefault = new Defaults({
        guildId: message.guildId,
        roleId: role.id,
      });

      await newDefault.save();
      message.channel.send(
        `Made the ${role.name} role the default role of the server`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
};
