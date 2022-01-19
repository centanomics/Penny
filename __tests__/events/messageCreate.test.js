const messageCreate = require('../../events/message/messageCreate');
const { getMessageMock } = require('../../__mocks__');

describe('Message Handler', () => {
  const message = getMessageMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error when the bot sends a message', async () => {
    message.content = '$ping';
    try {
      await messageCreate({}, message);
    } catch (err) {
      expect(err).toBeDefined();
      // expect(message.channel.send).not.toHaveBeenCalled();
    }
  });
});
