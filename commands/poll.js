const Discord = require('discord.js');
const removeQuotes = require('../utils/removeQuotes');
const Polls = require('../models/polls');

const pollsHelp = (message, args) => {
    console.log('lol');
    // const pollEmbed = new Discord.MessageEmbed().setTitle('Polls Help');
    // pollEmbed.addField('New', 'creates new bet');
    // message.channel.send({ embed: pollEmbed });
};
const createPoll = async (message, args) => {
    const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    // separates the arguments in the command by pair of quotation marks
    let pollArgs = args
        .slice(1)
        .join(' ')
        .replace(/([“”])/g, '"')
        .split('" "');
    args = await removeQuotes(pollArgs);

    // if there are no arguments outside of the question, create two default ones
    if (args.length === 1) {
        args.push('Yes.');
        args.push('No.');
    }

    // console.log(args);

    //creates a poll object for the database
    const newPoll = new Polls({
        guildId: message.guildId,
        pollName: args[0],
        pollArgs: args.slice(1),
    });

    // console.log(newPoll);

    // await newPoll.save();
    const pollEmbed = new Discord.MessageEmbed().setTitle(newPoll.pollName);
    for (let i = 0; i < newPoll.pollArgs.length; i++) {
        pollEmbed.addField(
            `${numberEmotes[i]} ${newPoll.pollArgs[i]}`,
            ' ',
            false
        );
    }
    const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
    for (let i = 0; i < newPoll.pollArgs.length; i++) {
        await pollMessage.react(numberEmotes[i]);
    }
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

/*
Poll command needs to do the following:
1. Create a poll with the options given. Defaults to yes or no.
2. When the user changes a reaction, remove their other reactions on the same message
3. When you close a poll, add an x reaction and show the final tally in the message itself
poll - shows info about the command
poll new - creates a poll
poll close - closes a poll
poll delete deletes a poll
*/
