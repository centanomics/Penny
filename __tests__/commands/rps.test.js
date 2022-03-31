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
    expect(rpsResults.userChoice).toBe('rock');
    expect(rpsResults.botChoice).toMatch(/rock|paper|scissors+/g);
    expect(msgMock.channel.send).toBeCalledWith(expect.any(String));
  });

  test("user doesn't choose one of the three options", () => {
    const rpsResults = rps.execute(msgMock, ['wow']);
    expect(rpsResults).toBeFalsy();
    expect(msgMock.channel.send).toHaveBeenCalledWith(
      'You gotta choose rock, paper, or scissors man'
    );
  });
});
