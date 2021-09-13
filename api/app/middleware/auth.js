const jwt = require("jsonwebtoken");
const MESSAGE = require("../constant/message");
const client = require("../database");

module.exports = (req, res, next) => {
  try {
    // Get token in request
    const token = req.headers.authorization.split(" ")[1];

    //Verify token to correspond with token secret
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    //
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
        if (response.rows.length === 0) {
          return res.json(MESSAGE.INVALID_TOKEN);
        }
        const { id } = response.rows[0];
        if (id && id !== userId) {
          return res.status(404).json({
            message: MESSAGE.INVALID_USER_ID,
          });
        } else {
          next();
        }
      }
    });
  } catch {
    res.status(401).json({
      message: MESSAGE.INVALID_REQUEST,
    });
  }
};
