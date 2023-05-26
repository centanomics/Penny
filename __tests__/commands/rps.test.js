const rps = require('../../commands/rps');

const { getMessageMock } = require('../../__mocks__');

describe('rps tests', () => {
  const msgMock = getMessageMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rps sends truthy value and runs', () => {
    const rpsResults = rps.execute(msgMock, ['rock']);
    expect(rpsResults).toBeTruthy();
    expect(rpsResults.userChoice).toMatch(/rock|paper|scissors+/g);
    expect(rpsResults.botChoice).toMatch(/rock|paper|scissors+/g);
    expect(msgMock.channel.send).toHaveBeenCalledWith(expect.any(String));
  });

  test('rps sends rock and runs', () => {
    const rpsResults = rps.execute(msgMock, ['rock']);
    expect(msgMock.channel.send).toHaveBeenCalledWith(
      expect.stringMatching(/You win!|The bot wins!|You tied!+/g)
    );
  });

  test('rps sends paper and runs', () => {
    const rpsResults = rps.execute(msgMock, ['paper']);
    expect(msgMock.channel.send).toHaveBeenCalledWith(
      expect.stringMatching(/You win!|The bot wins!|You tied!+/g)
    );
  });

  test('rps sends scissors and runs', () => {
    const rpsResults = rps.execute(msgMock, ['scissors']);
    expect(msgMock.channel.send).toHaveBeenCalledWith(
      expect.stringMatching(/You win!|The bot wins!|You tied!+/g)
    );
  });

  test("user doesn't choose one of the three options", () => {
    const rpsResults = rps.execute(msgMock, ['wow']);
    expect(rpsResults).toBeFalsy();
    expect(msgMock.channel.send).toHaveBeenCalledWith(
      'You gotta choose rock, paper, or scissors man'
    );
  });
});
