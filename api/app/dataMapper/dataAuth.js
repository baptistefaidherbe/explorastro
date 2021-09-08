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
};
module.exports = dataAuth;
