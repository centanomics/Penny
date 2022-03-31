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
  execute: async (message, args) => {
    const botChoice = options[getRandomInt(3) + 1];
    let userChoice; //args[0].toLowerCase();

    // if (args.length === 0) {
    //   const rpsHelperr = new Discord.MessageEmbed();
    //   rpsHelperr.setTitle('Rps Help.');
    //   rpsHelperr.addField(
    //     '$rps "[rock, paper, or scissors]"',
    //     'Play a game of Rock Paper Scissors against the bot.'
    //   );
    //   message.channel.send({ embed: rpsHelperr });
    //   return;
    // } else {
    //   userChoice = args[0].toLowerCase();
    // }

    if (options.indexOf(userChoice) === -1) {
      message.channel.send('You gotta choose rock, paper, or scissors man');
      return;
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

    return true;
  },
};
