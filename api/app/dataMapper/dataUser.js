const client = require("../database");

const dataUser = {
    getUsersRequest: (callback) => {
    const explorations_query = {
      text: `SELECT * FROM "user";`,
    };

    client.query(explorations_query, callback);
  },
  getUserByIdRequest: (id, callback) => {
    const getUserById_query = {
      text: `SELECT * FROM "user" WHERE "id" = $1;`,

      values: [id],
    };
    client.query(getUserById_query, callback);
  },
};
module.exports = dataUser;
