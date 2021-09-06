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
  createExplorationRequest: (name,author_id, callback) => {
    const createExplorationRequest_query = {
        text : `
                INSERT INTO "exploration"
                    (name, author_id)
                VALUES
                    ($1, $2);`,
            values : [name, author_id]
    }
    client.query(createExplorationRequest_query, callback);
  },
};
module.exports = dataMapper;
