// @command     help
// @desc        shows the commands the user can use. if a user is a mod then will show
//              mod commands as well.
// @access      all

const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows the commands the user can use.',
    delay: 0,
    mod: false,
    execute: (message, args) => {
        const helpEmbed = new Discord.MessageEmbed().setTitle('Penny Commands');
        const userMod = message.member.permissions.has('ADMINISTRATOR');

        let commands = message.client.commands.filter((command) => {
            return !command.mod ? command : null;
        });
        commands.map((command) => {
            const commandName =
                command.name[0].toUpperCase() + command.name.slice(1);
            helpEmbed.addField(`${commandName}:`, command.description);
        });

        if (userMod) {
            let commands = message.client.commands.filter((command) => {
                return command.mod ? command : null;
            });
            commands.map((command) => {
                const commandName =
                    command.name[0].toUpperCase() + command.name.slice(1);

                helpEmbed.addField(`${commandName}:`, command.description);
            });
        }

        message.channel.send({ embeds: [helpEmbed] });
        return true;
    },
};
