const { dataAuth } = require("../dataMapper/");
const jsonwebtoken = require("jsonwebtoken");
const MESSAGE = require("../constant/message");
const bcrypt = require("bcrypt");

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json(MESSAGE.MISSING_INPUT);
    }
    dataAuth.checkUserRequest(email, (error, result) => {
      if (error) {
        console.trace(error);
      } else {
        if (result.rows.length == 0) {
          return res.json(MESSAGE.INVALID_CREDENTIAL);
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
                return response.json(MESSAGE.INVALID_CREDENTIAL);
              }
            }
          });
        }
      }
    });
  },
  signup: (req, res) => {
    const { firstname, lastname, username, email, password, city, zipcode } =
      req.body;

    dataAuth.findUserRequest(username, email, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        console.log(response.rows.length);

        if (response.rows.length !== 0) {
          return res.json(MESSAGE.USER_EXIST);
        }
      }
    });

    const passwordHash = bcrypt.hashSync(password, 10);
    dataAuth.createUserRequest(
      firstname,
      lastname,
      username,
      email,
      passwordHash,
      city,
      zipcode,
      (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json(MESSAGE.SUCCESS_MODIFICATION);
        }
      }
    );
  },
};

module.exports = authController;
