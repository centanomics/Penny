const Invites = require('../../models/invites');

module.exports = async (client, invite) => {
  try {
    const toDelete = await Invites.findOne({ inviteId: invite.code });
    await Invites.findByIdAndDelete(toDelete._id);
  } catch (err) {
    console.log(err.message);
  }
};
