// @command     permissions
// @desc        Manages permissions for the bot
// @access      mod

const Discord = require('discord.js');

const Permissions = require('../../models/permissions');

module.exports = {
    name: 'permissions',
    description: 'Manages permissions for the bot',
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

            // saves perms to database
            await newPerm.save();
            message.channel.send(
                'Created Permissions for this server! Try using the permissions command again!'
            );
        } else {
            // if the user has a valid argument update the permission
            // if they dont/have no args show the perms
            if (args.length === 1) {
                // grabs permission to change
                let permToChange = await Permissions.findOne({
                    guildId: message.guildId,
                    permissionName: args[0],
                });

                // sets the new value
                const permFields = {
                    allowed: !permToChange.allowed,
                };

                // updates the permission
                permToChange = await Permissions.findByIdAndUpdate(
                    permToChange._id,
                    { $set: permFields },
                    { new: true }
                );

                // notifies the user of the change
                message.channel.send(
                    `Changed the ${permToChange.permissionName} perm to ${permToChange.allowed}`
                );
            } else {
                // sends an embed of the perms and how to change them
                const msgEmbed = new Discord.MessageEmbed()
                    .setTitle('Penny Permissions')
                    .setFooter(
                        message.author.username,
                        message.author.avatarURL()
                    );
                for (let i = 0; i < perms.length; i++) {
                    msgEmbed.addField(
                        perms[i].permissionName + ' - ' + perms[i].allowed,
                        perms[i].description,
                        true
                    );
                }

                msgEmbed.addField(
                    'Changing perms',
                    'Use $permissions <permission name> to switch the perms on/off'
                );

                message.channel.send({ embeds: [msgEmbed] });
            }
        }
    },
};
