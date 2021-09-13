const { dataParticipate } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const participateController = {
  createParticipate: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { user_id } = req.body;

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
