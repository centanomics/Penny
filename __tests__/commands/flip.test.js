const flip = require('../../commands/flip');

const { getMessageMock } = require('../../__mocks__');

describe('flip command stuff', () => {
  const msgMock = getMessageMock();
  // console.log(msgMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('flip returns either heads or tails', () => {
    const flipResults = flip.execute(msgMock);
    expect(flipResults).toMatch(/Heads|Tails+/g);
  });
});
