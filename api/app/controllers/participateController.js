const { dataParticipate } = require("../dataMapper/");

const participateController = {
  createParticipate: (req, res) => {
    const { exploration_id, user_id } = req.body;
    dataParticipate.createParticipateRequest(
      exploration_id,
      user_id,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json("success modifications");
        }
      }
    );
  },
};

module.exports = participateController;
