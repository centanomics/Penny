const ready = require('../../events/ready');

const { getClientMock } = require('../../__mocks__/index');

describe('Ready event Tests', () => {
  const clientMock = getClientMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('ready event runs', () => {
    const readyEvent = ready(clientMock);
    expect(readyEvent).toBeTruthy();
  });

  test('ready event returns status object', async () => {
    const readyEvent = await ready(clientMock);
    const statusObj = {
      status: 'online',
      activities: [
        {
          name: '$help',
          type: 'PLAYING',
        },
      ],
    };
    expect(readyEvent).toEqual(statusObj);
  });
});
