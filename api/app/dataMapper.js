const client = require("./database");

const dataMapper = {
  getExplorationsRequest: (callback) => {
    const explorations_query = {
      text: 'SELECT * FROM "exploration";',
    };

    client.query(explorations_query, callback);
  },
  getExplorationByIdRequest: (id, callback) => {
    const explorationByID_query = {
        text: 'SELECT * FROM "exploration" WHERE "id" = $1;',
        values : [id]
    }
    client.query(explorationByID_query, callback);
  },
  deleteExplorationRequest: (id, callback) => {
    const deleteExploration_query = {
        text: 'DELETE from "exploration" WHERE "id" = $1;',
        values : [id]
    }
    client.query(deleteExploration_query, callback);
  },
};
module.exports = dataMapper;
