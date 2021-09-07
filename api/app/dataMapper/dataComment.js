const client = require("../database");

const dataComment = {
  createCommentRequest: (author_id, exploration_id, content, callback) => {
    console.log(author_id);
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
  updateCommentRequest: (id, exploration_id, content, callback) => {
    const updateExploration_query = {
      text: `
        UPDATE comment
        SET content= $3
        WHERE id= $1
        AND exploration_id = $2;`,
      values: [id, exploration_id, content],
    };
    client.query(updateExploration_query, callback);
  },
};
module.exports = dataComment;
