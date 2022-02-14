module.exports = async (client, message) => {
  try {
    const prefix = process.env.COMMAND_PREFIX;
    // checks if the message had the prefix or from itself
    if (!message.content.startsWith(prefix) || message.author.bot) {
      throw Error('user is a bot or there is no prefix');
    }

    // adds a command to the used recently list, removes it after a specified delay
    const delayCommand = (wentThrough, command, authorId, delayCount) => {
      if (wentThrough) {
        client.usedCommandRecently.add(command + authorId);
        setTimeout(() => {
          client.usedCommandRecently.delete(command + authorId);
        }, delayCount);
      }
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmdObject = client.commands.get(command);

    if (cmdObject) {
      // checks if command needs mod role and if user had administrator role
      // runs if cmdmod is true and usermod is true or if only cmdmod is false
      const userMod = message.member.permissions.has('ADMINISTRATOR');
      if (cmdObject.mod === userMod || cmdObject.mod === false) {
        // adds a delay if the user is NOT a mod, or delay is at 0
        // not a mod || delay at 0 && not in set
        if (
          !userMod &&
          cmdObject.delay !== 0 &&
          !client.usedCommandRecently.has(command + message.author.id)
        ) {
          const ver = await cmdObject.execute(message, args);
          delayCommand(ver, command, message.author.id, cmdObject.delay);
          return;
        }

        if (client.usedCommandRecently.has(command + message.author.id)) {
          message.channel.send("You can't use that yet!");
          return;
        }

        await cmdObject.execute(message, args);
      } else {
        message.channel.send("You don't have the perms to do this btw!");
      }
    } else {
      // if the command doesn't exist, notify the user
      message.channel.send(`${command} command does not exist`);
    }
  } catch (err) {
    console.log(err.message);
  }
};
