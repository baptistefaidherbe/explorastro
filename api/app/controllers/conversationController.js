const Conversation = require("../models/Conversation");

const conversationController = {
  postConversation: async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.sender, req.body.receiver],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getConversation: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.id] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = conversationController;
