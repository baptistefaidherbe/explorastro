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
      text: `SELECT
      u.id,
      u.firstname,
      u.lastname,
      u.username,
      u.email,
      u.avatar_url,
      u.bio,
      u.city,
      u.zipcode,
      u.role_id,
      u.notification,
      (   SELECT
          json_agg(exploration)  explorationCreate
          FROM
          "user" u
          FULL JOIN exploration on u.id = exploration.author_id
          where u.id = $1
        ),
        ( SELECT
          json_agg(exploration)  explorationParticipate
          FROM
          "user" u
          FULL JOIN participate on u.id = participate.user_id
          FULL JOIN exploration on participate.exploration_id = exploration.id
          where u.id = $1
        )
      
      FROM "user" u
      where u.id = $1
      GROUP BY u.id;`,

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
    bio,
    city,
    zipcode,
    avatar_url,
    callback
  ) => {
    const updateUser_query = {
      text: `
        UPDATE "user"
        SET firstname = $2,
        lastname = $3,
        bio= $4,
        city= $5,
        zipcode = $6,
        avatar_url= $7
        WHERE id= $1;`,
      values: [id, firstname, lastname, bio, city, zipcode, avatar_url],
    };
    client.query(updateUser_query, callback);
  },
  updateUserNameRequest: (id, username, callback) => {
    const updateUsername_query = {
      text: `
        UPDATE "user"
        SET username = $2
        WHERE id= $1;`,
      values: [id, username],
    };
    client.query(updateUsername_query, callback);
  },
  updatePasswordRequest: (id, password, callback) => {
    const updatePassword_query = {
      text: `
        UPDATE "user"
        SET password = $2
        WHERE id= $1;`,
      values: [id, password],
    };
    client.query(updatePassword_query, callback);
  },
  updateEmailRequest: (id, email, callback) => {
    const updateEmailquery = {
      text: `
        UPDATE "user"
        SET email = $2
        WHERE id= $1;`,
      values: [id, email],
    };
    client.query(updateEmailquery, callback);
  },
  checkUserNameRequest: (username, callback) => {
    const checkUserName_query = {
      text: `
        SELECT username
        FROM "user"
        WHERE username = $1;`,
      values: [username],
    };
    client.query(checkUserName_query, callback);
  },
  checkEmailRequest: (email, callback) => {
    const checkEmail_query = {
      text: `
        SELECT email
        FROM "user"
        WHERE email = $1;`,
      values: [email],
    };
    client.query(checkEmail_query, callback);
  },
  updateUserNotificationRequest: (id, notification, callback) => {
    const updateUsername_query = {
      text: `
        UPDATE "user"
        SET notification = $2
        WHERE id= $1;`,
      values: [id, notification],
    };
    client.query(updateUsername_query, callback);
  },
};
module.exports = dataUser;
