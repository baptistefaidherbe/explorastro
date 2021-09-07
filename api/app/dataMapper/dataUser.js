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
  deleteUserRequest: (id, callback) => {
    const deleteUser_query = {
      text: 'DELETE from "user" WHERE "id" = $1;',
      values: [id],
    };
    client.query(deleteUser_query, callback);
  },
  updateUserRequest: (
    id,
    firstname,
    lastname,
    username,
    email,
    password,
    avatar_url,
    bio,
    city,
    zipcode,
    callback
  ) => {
    const updateUser_query = {
      text: `
        UPDATE "user"
        SET firstname = $2,
        lastname = $3,
        username = $4,
        email= $5,
        password= $6,
        avatar_url= $7,
        bio= $8,
        city= $9,
        zipcode = $10
        WHERE id= $1;`,
      values: [
        id,
        firstname,
        lastname,
        username,
        email,
        password,
        avatar_url,
        bio,
        city,
        zipcode
      ],
    };
    client.query(updateUser_query, callback);
  },
};
module.exports = dataUser;
