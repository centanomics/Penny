// @command     bets
// @desc        bet managing commandd
// @access      all
module.exports = {
  name: 'bets',
  description: 'A bet managing command',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    message.channel.send('bets start!');
    return true;
  },
};
