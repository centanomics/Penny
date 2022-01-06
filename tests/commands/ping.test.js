const ping = require('../../commands/ping');

it('ping passes for succesful function', () => {
  const runPing = ping.execute();
  expect(runPing).toBeTruthy();
});
