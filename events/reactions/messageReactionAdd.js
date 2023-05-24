const Polls = require('../../models/polls');
// sends a log there is a reaction
module.exports = async (client, messageReaction, user) => {
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
        // console.log(messageReaction.emoji);
        if (user.id === poll[0].userId && messageReaction.emoji.name === '❌') {
            if (!poll[0].isClosed) {
                const pollFields = {
                    isClosed: true,
                };

                await Polls.findByIdAndUpdate(
                    poll[0]._id,
                    { $set: pollFields },
                    { new: true }
                );

                messageReaction.message.channel.send(
                    `"${poll[0].pollName}" is now closed.`
                );
            }
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
