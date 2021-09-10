const jwt = require("../utils/token");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const { dataAuth } = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const forgotPasswordController = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      dataAuth.findUserMailRequest(email, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          if (response.rows.length !== 0) {
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
      if (token) {
        jwt.checkToken(token, (error, decodedToken) => {
          if (error) {
            res.json(MESSAGE.INVALID_TOKEN);
          } else {
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
      console.log(error);
      res.status(401).json({
        message: MESSAGE.INVALID_REQUEST,
      });
    }
  },
};

module.exports = forgotPasswordController;
