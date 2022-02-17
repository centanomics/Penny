const { run } = require('jest');
const messageCreate = require('../../events/message/messageCreate');
const { getMessageMock, getClientMock } = require('../../__mocks__');

describe('Message Handler', () => {
  const message = getMessageMock();
  const client = getClientMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error when the bot sends a message', async () => {
    message.content = '!pong';
    message.author.bot = true;

    // expect(() => messageCreate(client, message)).not.toThrow(
    //   'user is a bot or there is no prefix'
    // );
    expect.assertions(1);
    try {
      await messageCreate(client, message);
    } catch (error) {
      expect(error.message).toEqual('user is a bot or there is no prefix');
    }
  });
});
