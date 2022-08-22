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

    expect.assertions(1);
    try {
      const result = await messageCreate(client, message);
      throw result;
    } catch (error) {
      expect(error.message).toEqual('user is a bot or there is no prefix');
    }
  });
});
