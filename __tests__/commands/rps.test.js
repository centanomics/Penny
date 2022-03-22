const pong = require('../../commands/pong');

const { getMessageMock } = require('../../__mocks__');

describe('pong tests', () => {
  const msgMock = getMessageMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('test sends pong', () => {
    const runPong = pong.execute(msgMock, []);
    expect(runPong).toBeTruthy();
    expect(msgMock.channel.send).toHaveBeenCalledWith('ping!');
  });
});
