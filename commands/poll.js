const Discord = require('discord.js');
const removeQuotes = require('../utils/removeQuotes');
const Polls = require('../models/polls');

const pollsHelp = async (message, args) => {
  const pollEmbed = new Discord.MessageEmbed().setTitle('Polls Help');
  pollEmbed.addField(
    '$poll new "poll title" "option 1" ... "option 9"',
    'Creates a new poll with up to 9 options. If no options given, will default to yes and no.'
  );
  pollEmbed.addField(
    '$poll show',
    "Shows the polls you've created in the server, providing links to them."
  );
  pollEmbed.addField(
    '$poll close "poll title"',
    "Closes a poll you've created in the server, adding an ❌ reaction. You can close polls yourself by adding an ❌ reaction manually."
  );
  pollEmbed.addField(
    '$poll delete "poll title"',
    "Deletes a poll you've created in the server, removing the message with the poll."
  );
  await message.channel.send({ embeds: [pollEmbed] });
};

const createPoll = async (message, args) => {
  //setup
  const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

  try {
    // separates the arguments in the command by pair of quotation marks
    let pollArgs = args
      .slice(1)
      .join(' ')
      .replace(/([“”])/g, '"')
      .split('" "');
    args = await removeQuotes(pollArgs);

    //checks if the title exist
    const authorPolls = await Polls.find({
      guidId: message.guild.id,
      userId: message.author.id,
      pollName: args[0],
    });
    if (authorPolls.length !== 0) {
      throw {
        message:
          'A poll with this same name already exists: ' +
          authorPolls[0].messageUrl,
      };
    }

    // if there are no arguments outside of the question, create two default ones
    if (args.length === 1) {
      args.push('Yes.');
      args.push('No.');
    }

    // checks if there are more than 9 arguments.
    if (args.length > 10) {
      throw {
        message: 'You cannot have a poll with more than 9 arguments',
      };
    }

    // console.log(args);
    const pollEmbed = new Discord.MessageEmbed().setTitle(args[0]);

    for (let i = 1; i < args.length; i++) {
      pollEmbed.addField(`${numberEmotes[i - 1]} ${args[i]}`, ' ', false);
    }
    const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
    for (let i = 1; i < args.length; i++) {
      await pollMessage.react(numberEmotes[i - 1]);
    }

    //creates a poll object for the database
    const newPoll = new Polls({
      guildId: message.guildId,
      userId: message.author.id,
      messageUrl: pollMessage.url,
      messageId: pollMessage.id,
      channelId: message.channel.id,
      pollName: args[0],
      pollArgs: args.slice(1),
    });

    // console.log(newPoll);

    await newPoll.save();
    return true;
  } catch (error) {
    message.channel.send(error.message);
    return false;
  }
};

const showPolls = async (message, args) => {
  // gets all open polls the user made in the server
  const polls = await Polls.find({
    guidId: message.guild.id,
    userId: message.author.id,
  });

  const pollEmbed = new Discord.MessageEmbed().setTitle(
    `${message.author.username}'s polls`
  );

  for (let i = 0; i < polls.length; i++) {
    pollEmbed.addField(
      `${i + 1}: ${polls[i].pollName} - ${
        polls[i].isClosed ? 'closed' : 'open'
      }`,
      `${polls[i].messageUrl}`,
      false
    );
  }

  const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
};

const deletePoll = async (message, args) => {
  // separates the arguments in the command by pair of quotation marks
  let pollArgs = args
    .slice(1)
    .join(' ')
    .replace(/([“”])/g, '"')
    .split('" "');
  args = await removeQuotes(pollArgs);

  try {
    // gets all open polls the user made in the server
    const polls = await Polls.find({
      guidId: message.guild.id,
      userId: message.author.id,
      pollName: args[0],
    });

    if (polls.length === 0) {
      throw { message: 'Poll does not exist.' };
    }

    let messageToDelete = await message.guild.channels.fetch(
      polls[0].channelId
    );
    messageToDelete = await messageToDelete.messages.fetch(polls[0].messageId);

    await messageToDelete.delete();
    await Polls.findByIdAndRemove(polls[0].id);

    message.channel.send('Poll has been removed.');

    return true;
  } catch (error) {
    message.channel.send(error.message);
    console.log(error);
    return false;
  }
};

const closePoll = async (message, args) => {
  let pollArgs = args
    .slice(1)
    .join(' ')
    .replace(/([“”])/g, '"')
    .split('" "');
  args = await removeQuotes(pollArgs);

  try {
    const polls = await Polls.find({
      guidId: message.guild.id,
      userId: message.author.id,
      pollName: args[0],
    });

    if (polls.length === 0) {
      throw { message: 'Poll does not exist.' };
    }

    let messageToUpdate = await message.guild.channels.fetch(
      polls[0].channelId
    );
    messageToUpdate = await messageToUpdate.messages.fetch(polls[0].messageId);

    const pollFields = {
      isClosed: true,
    };

    messageToUpdate.react('❌');

    await Polls.findByIdAndUpdate(
      polls[0]._id,
      { $set: pollFields },
      { new: true }
    );

    message.channel.send(`"${polls[0].pollName}" is now closed.`);
  } catch (error) {
    message.channel.send(error.message);
    console.log(error);
  }
};

// @command     poll
// @desc        poll managing commandd
// @access      all
module.exports = {
  name: 'poll',
  description: 'Poll management. Type $poll for more',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    // message.channel.send('polls start!');

    switch (args[0]) {
      case 'new':
        createPoll(message, args);
        return;
      case 'show':
        showPolls(message, args);
        return;
      case 'delete':
        deletePoll(message, args);
        return;
      case 'close':
        closePoll(message, args);
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
show - shows open polls
poll close - closes a poll
poll delete deletes a poll
*/
