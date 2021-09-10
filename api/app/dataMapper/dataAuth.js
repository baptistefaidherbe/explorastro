const client = require("../database");

const dataAuth = {
  getPasswordHashRequest: (email, callback) => {
    const getPasswordHash_query = {
      text: `
                SELECT password
                FROM "user"
                WHERE email = $1;`,
      values: [email],
    };
    client.query(getPasswordHash_query, callback);
  },
  findUserRequest: (username, email, callback) => {
    const findUser_query = {
      text: `
                SELECT id, username, email
                FROM "user"
                WHERE username = $1
                OR email = $2;`,
      values: [username, email],
    };
    client.query(findUser_query, callback);
  },
  findUserMailRequest: (email, callback) => {
    const findUserMail_query = {
      text: `
                SELECT id,  email
                FROM "user"
                WHERE email = $1;`,
      values: [email],
    };
    client.query(findUserMail_query, callback);
  },
  findUserTokenRequest: (token, callback) => {
    const findUserMail_query = {
      text: `
                SELECT id
                FROM "user"
                WHERE token_temp = $1;`,
      values: [token],
    };
    client.query(findUserMail_query, callback);
  },
  checkUserRequest: (email, callback) => {
    const checkUser_query = {
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
        (   SELECT
            json_agg(exploration)  explorationCreate
            FROM
            "user" u
            FULL JOIN exploration on u.id = exploration.author_id
            where u.email = $1
          ),
          ( SELECT
            json_agg(exploration)  explorationParticipate
            FROM
            "user" u
            FULL JOIN participate on u.id = participate.user_id
            FULL JOIN exploration on participate.exploration_id = exploration.id
            where u.email = $1
          )
        
        FROM "user" u
        where u.email = $1
        GROUP BY u.id;`,
      values: [email],
    };
    client.query(checkUser_query, callback);
  },
  createUserRequest: (
    firstname,
    lastname,
    username,
    email,
    passwordHash,
    city,
    zipcode,
    callback
  ) => {
    const createUser_query = {
      text: `
            INSERT INTO "user"
                (firstname, lastname, username, email, password, city, zipcode)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7);`,
      values: [
        firstname,
        lastname,
        username,
        email,
        passwordHash,
        city,
        zipcode,
      ],
    };
    client.query(createUser_query, callback);
  },
  updateTokenTmpRequest: (id, tokenTmp, callback) => {
    const updateUser_query = {
      text: `
        UPDATE "user"
        SET token_temp = $2
        WHERE id= $1;`,
      values: [id, tokenTmp],
    };
    client.query(updateUser_query, callback);
  },
  updatePasswordRequest: (id, newPassword, callback) => {
    const updateUser_query = {
      text: `
        UPDATE "user"
        SET token_temp = NULL,
        password= $2
        WHERE id= $1;`,
      values: [id, newPassword],
    };
    client.query(updateUser_query, callback);
  },
};
module.exports = dataAuth;
