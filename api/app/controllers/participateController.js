const { dataParticipate } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const participateController = {
  createParticipate: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { user_id } = req.body;
    if (!user_id) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

    //Participate to exploration
    dataParticipate.createParticipateRequest(
      exploration_id,
      user_id,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },

  deleteParticipate: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { user_id } = req.body;
    if (!user_id) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

    //Don't participate to exploration
    dataParticipate.deleteParticipateRequest(
      exploration_id,
      user_id,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },
};

module.exports = participateController;
