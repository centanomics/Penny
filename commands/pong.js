const sendLog = require('../utils/sendLog');

// @command     pong
// @desc        a check to see if the bot is working
// @access      all
module.exports = {
  name: 'pong',
  description: 'This makes the bot reply ping!',
  delay: 10000,
  mod: false,
  execute: (message, args) => {
    message.channel.send('ping!');

    sendLog(message.guild, 'User as been added');

    return true;
  },
};
