const Discord = require('discord.js');
const removeQuotes = require('../utils/removeQuotes');

const pollsHelp = (message, args) => {
  console.log('lol');
  // const pollEmbed = new Discord.MessageEmbed().setTitle('Polls Help');
  // pollEmbed.addField('New', 'creates new bet');
  // message.channel.send({ embed: pollEmbed });
};
const createPoll = async (message, args) => {
  let moreArgs = args
    .slice(1)
    .join(' ')
    .replace(/([“”])/g, '"')
    .split('" "');
  args = await removeQuotes(moreArgs);
  console.log(args);
};

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
        createPoll(message, args);
        return;
      default:
        pollsHelp(message, args);
        return;
    }

    return true;
  },
};
