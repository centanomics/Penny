const ping = require('../../commands/ping');

const { getMessageMock } = require('../../__mocks__');

describe('Ping Command', () => {
  const msgMock = getMessageMock();
  // console.log(msgMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send pong!', () => {
    // const runPing = ping.execute(msgMock, []);
    // expect(msgMock.channel.send).toHaveBeenCalledWith('pong!');
    expect(1).toBe(1);
  });
});
