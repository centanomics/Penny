const sum = require('./sum');

// describe test, then a callback
it('should add 1 + 2 to equal 3', () => {
  const result = sum(1, 2);
  expect(result).toBe(7);
});
