const Discord = require('discord.js');
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const options = ['rock', 'paper', 'scissors', 'rock'];

// @command     rps
// @desc        plays a game of rock paper scissors with the bot
// @access      all
module.exports = {
  name: 'rps',
  description: 'Plays a game of rock paper scissors with the bot',
  delay: 5000,
  mod: false,
  execute: (message, args) => {
    const botChoice = options[getRandomInt(3) + 1];
    let userChoice = args[0].toLowerCase();

    // checks to see if the user entered a valid value
    if (options.indexOf(userChoice) === -1) {
      message.channel.send('You gotta choose rock, paper, or scissors man');
      return false;
    }
    message.channel.send(
      `${message.author.username}: ${userChoice}\nPenny: ${botChoice}`
    );
    if (botChoice === userChoice) {
      message.channel.send('You tied!');
    } else {
      if (botChoice === 'rock') {
        if (userChoice === 'paper') {
          message.channel.send('You win!');
        } else {
          message.channel.send('The bot wins!');
        }
      }
      if (botChoice === 'paper') {
        if (userChoice === 'scissors') {
          message.channel.send('You win!');
        } else {
          message.channel.send('The bot wins!');
        }
      }
      if (botChoice === 'scissors') {
        if (userChoice === 'rock') {
          message.channel.send('You win!');
        } else {
          message.channel.send('The bot wins!');
        }
      }
    }

    return { botChoice, userChoice };
  },
};
