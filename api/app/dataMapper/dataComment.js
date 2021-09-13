const client = require("../database");

const dataComment = {
  createCommentRequest: (author_id, exploration_id, content, callback) => {
    const createComment_query = {
      text: `
            INSERT INTO "comment"
                (author_id, exploration_id, content)
            VALUES
                ($1, $2, $3);`,
      values: [author_id, exploration_id, content],
    };
    client.query(createComment_query, callback);
  },
  updateCommentRequest: (id, content, author_id, callback) => {
    const updateExploration_query = {
      text: `
        UPDATE comment
        SET content= $2,
        author_id= $3
        WHERE id= $1;`,
      values: [id, content, author_id],
    };
    console.log(updateExploration_query);
    client.query(updateExploration_query, callback);
  },
  deleteCommentRequest: (id, callback) => {
    const deleteComment_query = {
      text: 'DELETE from "comment" WHERE "id" = $1;',
      values: [id],
    };
    client.query(deleteComment_query, callback);
  },
};
module.exports = dataComment;
