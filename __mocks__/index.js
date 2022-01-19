// const { GuildMember, TextChannel, Message } = require('discord.js');

module.exports = {
  //guild member mock
  // channel mock
  getTextChannelMock: () => ({
    send: jest.fn(),
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
