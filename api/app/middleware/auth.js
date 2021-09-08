const jwt = require("jsonwebtoken");
const ERROR = require("../constant/error");
const client = require("../database");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    const sql_query = {
      text: `
        SELECT id
        FROM "user"
        WHERE id = $1
        ;`,
      values: [userId],
    };
    client.query(sql_query, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        const id = response.rows[0].id;
        if (id && id !== userId) {
          return res.status(404).json({
            message: ERROR.INVALID_USER_ID,
          });
        } else {
          next();
        }
      }
    });
  } catch {
    res.status(401).json({
      message: ERROR.INVALID_REQUEST,
    });
  }
};
