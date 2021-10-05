const { dataAuth } = require("../dataMapper/");
const MESSAGE = require("../constant/message");
const bcrypt = require("bcrypt");
const jwt = require("../utils/token");

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: MESSAGE.MISSING_INPUT });
    }

    dataAuth.checkEmailRequest(email, (error, result) => {
      if (error) {
        console.trace(error);
      } else {
        if (result.rows.length == 0) {
          return res.status(400).json({ message: MESSAGE.INVALID_CREDENTIAL });
        } else {
          dataAuth.getPasswordHashRequest(email, (error, response) => {
            if (error) {
              console.trace(error);
            } else {
              const passwordHash = response.rows[0].password;
              const verified = bcrypt.compareSync(password, passwordHash);

              if (verified) {
                const { id, email } = result.rows[0];
                const token = jwt.generateToken(id, email, "20h");

                res.json({
                  login: {
                    logged: true,
                    user: result.rows[0],
                    token,
                  },
                });
              } else {
                return res.status(400).json({
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
    const { firstname, lastname, username, email, password, city, zipcode } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !city ||
      !zipcode
    ) {
      return res.status(400).json({ message: MESSAGE.MISSING_FIEDLS });
    }

    dataAuth.findUserRequest(username, email, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        if (response.rows.length !== 0) {
          return res.status(400).json({ message: MESSAGE.USER_EXIST });
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
          return res
            .status(400)
            .json({ message: MESSAGE.SUCCESS_MODIFICATION });
        }
      }
    );
  },
};

module.exports = authController;
