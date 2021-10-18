// @command     pong
// @desc        a check to see if the bot is working
// @access      all
module.exports = {
  name: 'pong',
  description: 'This makes the bot reply ping!',
  delay: 5000,
  mod: false,
  execute: (message, args) => {
    message.channel.send('ping!');
  },
};
