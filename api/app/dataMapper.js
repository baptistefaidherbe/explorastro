const client = require("./database");

const dataMapper = {
    getExplorationsRequest: (callback) => {
    const explorations_query = {
      text: 'SELECT * FROM "exploration";',
    };

    client.query(explorations_query, callback);
  },
};
module.exports = dataMapper;
