const { dataComment } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const commentController = {
  createComment: (req, res) => {
    const exploration_id = Number(req.params.exploration_id);
    const { author_id, content } = req.body;

    if (!exploration_id || !author_id || !content) {
      res.json(MESSAGE.MISSING_FIEDLS);
    }

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
    const id = Number(req.params.id);
    const { content, author_id } = req.body;

    if (!(content && author_id)) {
      res.json(MESSAGE.MISSING_FIEDLS);
    }

    dataComment.updateCommentRequest(
      id,
      content,
      author_id,
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
    const id = Number(req.params.id);

    dataComment.deleteCommentRequest(id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
};

module.exports = commentController;
