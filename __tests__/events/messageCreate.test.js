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
    message.author.bot = false;

    // const result = await messageCreate(client, message);
    // console.log(result);

    expect(() => messageCreate(client, message)).toThrow(
      'user is a bot or there is no prefix'
    );

    // try {
    //   await messageCreate(client, message);
    //   console.log('err');
    // } catch (err) {
    //   console.log(err);
    //   expect(err).toBeDefined();
    //   expect(message.channel.send).toHaveBeenCalled();
    // }
  });
});
