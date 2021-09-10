const jsonwebtoken = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_SECRET;
const MESSAGE = require("../constant/message");
module.exports = {
  generateToken: (id, email, duration) => {
    const jwtContent = { userId: id, userMail: email };
    const jwtOptions = {
      algorithm: "HS256",
      expiresIn: duration,
    };
    return jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
  },

  checkToken: (token, callback) => {
    jsonwebtoken.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        return callback(MESSAGE.INVALID_TOKEN, null);
      }
      return callback(null, decodedToken);
    });
  },
};
