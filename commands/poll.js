const Discord = require('discord.js');

const pollsHelp = (message, args) => {
  const pollEmbed = new Discord.MessageEmbed().setTitle('Polls Help');
  pollEmbed.addField('New', 'creates new bet');
  message.channel.send({ embed: pollEmbed });
};
const createPoll = () => {};

// @command     poll
// @desc        poll managing commandd
// @access      all
module.exports = {
  name: 'poll',
  description: 'A poll managing command',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    // message.channel.send('polls start!');

    switch (args[0]) {
      case 'new':
        createPoll();
        return;
      default:
        pollsHelp(message, args);
        return;
    }

    return true;
  },
};
