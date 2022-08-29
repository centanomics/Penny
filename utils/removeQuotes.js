module.exports = async (args) => {
  args[0] = args[0].slice(1);
  args[args.length - 1] = args[args.length - 1].slice(
    0,
    args[args.length - 1].length - 1
  );
  return args;
};
