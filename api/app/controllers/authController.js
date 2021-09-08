const { dataAuth } = require("../dataMapper/");
const jsonwebtoken = require("jsonwebtoken");
const MESSAGE = require("../constant/message");
const bcrypt = require("bcrypt");

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(404).json({
        message: MESSAGE.MISSING_INPUT,
      });
    }
    dataAuth.checkUserRequest(email, (error, result) => {
      if (error) {
        console.trace(error);
      } else {
        if (result.rows.length == 0) {
          return res.status(404).json({
            message: MESSAGE.INVALID_CREDENTIAL,
          });
        } else {
          dataAuth.getPasswordHashRequest(email, (error, response) => {
            if (error) {
              console.trace(error);
            } else {
              const passwordHash = response.rows[0].password;
              const verified = bcrypt.compareSync(password, passwordHash);
              if (verified) {
                const { id, username } = result.rows[0];
                const jwtSecret = process.env.TOKEN_SECRET;
                const jwtContent = { userId: id };
                const jwtOptions = {
                  algorithm: "HS256",
                  expiresIn: "3h",
                };
                res.json({
                  logged: true,
                  user: result.rows[0],
                  token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
                });
              } else {
                return res.status(404).json({
                  message: MESSAGE.INVALID_CREDENTIAL,
                });
              }
            }
          });
        }
      }
    });
  },
  signup: (req, res) => {
    const {firstname, lastname, username, email, password, city, zipcode} = req.body;
    console.log(firstname)
    const passwordHash = bcrypt.hashSync(password, 10);
    dataAuth.createUserRequest(firstname, lastname, username, email, passwordHash, city, zipcode,(error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
};

module.exports = authController;
