// @command     role
// @desc        Manages permissions for the bot
// @access      mod
// #ad6f69

const Defaults = require('../../models/defaults');

const manageRole = async (message, args, taggedRole) => {
  // grabs default role
  const defRole = await Defaults.findOne({
    guild: message.guildId,
    roleType: args[0],
  });

  console.log(args);

  //if theres no role tagged, say what the default role is
  if (args[1] === undefined) {
    let dRoleName = '';
    if (defRole) {
      const dRole = await message.guild.roles.fetch(defRole.roleId);
      dRoleName = dRole.name;
    } else {
      dRoleName = 'Not defined yet!';
    }
    message.channel.send(`The ${args[0]} role is: ${dRoleName}`);
    return;
  }

  // if the role ids are the same then quit the function
  if (taggedRole && defRole) {
    if (taggedRole.id === defRole.roleId) {
      message.channel.send(
        `The ${taggedRole.name} role is already the set ${args[0]} role!`
      );
      return;
    }
  }

  if (defRole) {
    const roleFields = {
      roleId: taggedRole.id,
    };

    const updatedDefault = await Defaults.findByIdAndUpdate(
      defRole._id,
      { $set: roleFields },
      { new: true }
    );

    message.channel.send(`Updated the default role to ${taggedRole.name}`);
  } else {
    const newDefaultRole = new Defaults({
      guildId: message.guildId,
      roleId: taggedRole.id,
      roleType: args[0],
    });

    await newDefaultRole.save();
    message.channel.send(
      `Made the ${taggedRole.name} role the ${args[0]} role of the server`
    );
  }

  // if a role already exists for this server, update it
  // if not create a role in the database
};

module.exports = {
  name: 'role',
  description: 'Sets a default role for this server',
  delay: 0,
  mod: true,
  execute: async (message, args) => {
    const role = message.mentions.roles.first();
    try {
      switch (args[0]) {
        case 'default':
          manageRole(message, args, role);
          return;
        case 'admin':
          manageRole(message, args, role);
          return;
        default:
          message.channel.send(
            'Try adding "default" or "admin" after the command'
          );
          return;
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};
