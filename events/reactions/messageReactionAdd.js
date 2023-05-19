const Polls = require('../../models/polls');
// sends a log there is a reaction
module.exports = async (client, messageReaction, user) => {
    console.log('hi');
    try {
        const poll = await Polls.find({
            messageId: messageReaction.message.id,
        });

        if (messageReaction.me) {
            throw { message: 'Bot gave this reaction' };
        }
        if (poll.length === 0) {
            throw { message: 'Message is not a poll' };
        }

        const reactions = messageReaction.message.reactions.cache;

        reactions.forEach(async (reaction) => {
            console.log(reaction._emoji.name);
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
