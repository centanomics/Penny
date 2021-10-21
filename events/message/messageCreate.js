module.exports = async (client, message) => {
  const prefix = process.env.COMMAND_PREFIX;
  // checks if the message had the prefix or from itself
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const cmdObject = client.commands.get(command);
  if (cmdObject) {
    // checks if command needs mod role and if user had administrator role
    // runs if cmdmod is true and usermod is true or if only cmdmod is false
    const userMod = message.member.permissions.has('ADMINISTRATOR');
    if (cmdObject.mod === userMod || cmdObject.mod === false) {
      await cmdObject.execute(message, args);
    } else {
      message.channel.send("You don't have the perms to do this btw!");
    }
  } else {
    // if the command doesn't exist, notify the user
    message.channel.send(`${command} command does not exist`);
  }
};
