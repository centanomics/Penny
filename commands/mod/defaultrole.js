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
    const role = message.mentions.roles.first();

    try {
      const defRole = await Defaults.findOne({ guildId: message.guildId });

      // if there are no arguments, return what the default role is
      if (args.length === 0) {
        const dRole = await message.guild.roles.fetch(defRole.roleId);
        message.channel.send(`The default role is the ${dRole.name} role.`);
        return;
      }

      // if the role ids are the same quit the function
      if (role.id === defRole.roleId) {
        message.channel.send(
          `The ${role.name} role is already the default role!`
        );
        return;
      }

      // if a role already exists for this server, update it
      // if not create a role in the database
      if (defRole) {
        const roleFields = {
          roleId: role.id,
        };

        const updatedDefault = await Defaults.findByIdAndUpdate(
          defRole._id,
          { $set: roleFields },
          { new: true }
        );
        message.channel.send(`Updated the default role to ${role.name}`);
      } else {
        const newDefault = new Defaults({
          guildId: message.guildId,
          roleId: role.id,
        });

        await newDefault.save();
        message.channel.send(
          `Made the ${role.name} role the default role of the server`
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};
