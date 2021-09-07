const client = require("../database");

const dataUser = {
    getUsersRequest: (callback) => {
    const explorations_query = {
      text: `SELECT * FROM "user";`,
    };

    client.query(explorations_query, callback);
  },
};
module.exports = dataUser;
