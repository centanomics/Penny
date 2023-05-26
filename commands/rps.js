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
    if (userChoice === botChoice) {
      message.channel.send('You tied!');
    } else {
      if (userChoice === 'rock') {
        message.channel.send(
          botChoice === 'paper' ? 'The bot wins!' : 'You win!'
        );
      }
      if (userChoice === 'paper') {
        message.channel.send(
          botChoice === 'scissors' ? 'The bot wins!' : 'You win!'
        );
      }
      if (userChoice === 'scissors') {
        message.channel.send(
          botChoice === 'rock' ? 'The bot wins!' : 'You win!'
        );
      }
    }

    return { botChoice, userChoice };
  },
};
