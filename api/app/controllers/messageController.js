const Message = require("../models/Message");

const messageController = {
  postMessage: async (req, res) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text,
        avatar_url: req.body.avatar_url,
    });

    try {
      const saveMessage = await newMessage.save();
      res.status(200).json(saveMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const message = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;
