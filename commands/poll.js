const pollsHelp = () => {};
const createPoll = () => {};

// @command     poll
// @desc        poll managing commandd
// @access      all
module.exports = {
  name: 'poll',
  description: 'A poll managing command',
  delay: 0,
  mod: false,
  execute: (message, args) => {
    message.channel.send('polls start!');

    switch (args[0]) {
      default:
        pollsHelp();
        return;
    }

    return true;
  },
};
