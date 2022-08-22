// const { GuildMember, TextChannel, Message } = require('discord.js');

module.exports = {
  //guild member mock
  // client mock
  getClientMock: () => ({
    user: {
      setPresence: jest.fn(),
    },
  }),
  //message mock
  getMessageMock: () => ({
    channel: {
      send: jest.fn(),
    },
    content: '',
    author: {
      bot: false,
    },
  }),
};
