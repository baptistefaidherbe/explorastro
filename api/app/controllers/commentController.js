const { dataComment } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const commentController = {
  createComment: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { author_id, content } = req.body;

    dataComment.createCommentRequest(
      author_id,
      exploration_id,
      content,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },
  updateComment: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { id, content } = req.body;
    dataComment.updateCommentRequest(
      id,
      exploration_id,
      content,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },
  deleteComment: (req, res) => {
    const { id } = req.body;
    dataComment.deleteCommentRequest(id, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },
};

module.exports = commentController;
