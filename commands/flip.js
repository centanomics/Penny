// @command     flip
// @desc        flips a coin
// @access      all
module.exports = {
  name: 'flip',
  description: 'flips a coin',
  delay: 5000,
  mod: false,
  execute: (message, args) => {
    const coinSides = ['Heads', 'Tails'];
    const side = Math.floor(Math.random() * (2 - 1 + 1) + 1);

    message.channel.send(coinSides[side - 1]);
    return coinSides[side - 1];
  },
};
