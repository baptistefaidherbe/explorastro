const { dataComment } = require("../dataMapper/");

const commentController = {
  createComment: (req, res) => {
    const author_id = Number(req.params.author_id);
    const exploration_id  = Number(req.params.exploration_id );
    const {content} = req.body;

    dataComment.createCommentRequest(
      author_id,
      exploration_id,
      content,
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

module.exports = commentController;
