const client = require("../database");

const dataParticipate = {
  createParticipateRequest: (exploration_id, user_id, callback) => {
    const createParticipate_query = {
      text: `
            INSERT INTO "participate"
                (exploration_id, user_id)
            VALUES
                ($1, $2);`,
      values: [exploration_id, user_id],
    };
    client.query(createParticipate_query, callback);
  },
  deleteParticipateRequest: (exploration_id, user_id, callback) => {
    const deleteParticipate_query = {
      text: 'DELETE from "participate" WHERE "exploration_id" = $1 AND "user_id"= $2;',
      values: [exploration_id, user_id],
    };
    client.query(deleteParticipate_query, callback);
  },
};
module.exports = dataParticipate;
