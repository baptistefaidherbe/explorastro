const jwt = require("../utils/token");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const { dataAuth } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const forgotPasswordController = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.json(MESSAGE.MISSING_INPUT);
      }
      //Check if email exist in db
      dataAuth.findUserMailRequest(email, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          if (response.rows.length === 0) {
            return res.json(MESSAGE.USER_NOT_EXIST);
          }
          const { id, email } = response.rows[0];
          const token = jwt.generateToken(id, email, "10m");
          mailer.sendMail(email, token);
          dataAuth.updateTokenTmpRequest(id, token, (error, response) => {
            if (error) {
              console.trace(error);
            } else {
              return res.json(MESSAGE.SUCCESS_MODIFICATION);
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: MESSAGE.INVALID_REQUEST,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const token = req.params.token;
      const { password } = req.body;

      if (!password) {
        return res.json(MESSAGE.MISSING_INPUT);
      }

      if (token) {
        jwt.checkToken(token, (error, decodedToken) => {
          if (error) {
            res.json(MESSAGE.INVALID_TOKEN);
          } else {
            //Check if user token exist in db
            dataAuth.findUserTokenRequest(token, (error, response) => {
              if (error) {
                console.trace(error);
              } else {
                if (response.rows.length === 0) {
                  return res.json(MESSAGE.TOKEN_NOT_MATCH);
                }
                const { id } = response.rows[0];
                const passwordHash = bcrypt.hashSync(password, 10);

                dataAuth.updatePasswordRequest(
                  id,
                  passwordHash,
                  (error, response) => {
                    if (error) {
                      console.trace(error);
                    } else {
                      return res.json(MESSAGE.SUCCESS_PASSWORD_UPDATE);
                    }
                  }
                );
              }
            });
          }
        });
      }
    } catch (error) {
      res.status(401).json({
        message: MESSAGE.INVALID_REQUEST,
      });
    }
  },
};

module.exports = forgotPasswordController;
