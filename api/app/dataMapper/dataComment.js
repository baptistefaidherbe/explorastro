const client = require("../database");

const dataComment = {
    createCommentRequest: (author_id, exploration_id, content, callback) => {
        console.log(author_id)
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
};
module.exports = dataComment;
