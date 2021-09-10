const jwt = require("../utils/token");
const bcrypt = require("bcrypt");
const hbs = require("nodemailer-express-handlebars");
const EMAIL_MAILER = process.env.MAILER_EMAIL_ID;
const PASSWORD_MAILER = process.env.MAILER_PASSWORD;
const BASE_URL = process.env.BASE_URL;
const nodemailer = require("nodemailer");
const { dataAuth } = require("../dataMapper/");
const path = require("path");
const MESSAGE = require("../constant/message");


const forgotPasswordController = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_MAILER,
          pass: PASSWORD_MAILER,
        },
      });

      var handlebarsOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve(__dirname, "../templates"),
          defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, "../templates"),
        extName: ".html",
      };

      smtpTransport.use("compile", hbs(handlebarsOptions));

      dataAuth.findUserMailRequest(email, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          if (response.rows.length !== 0) {
            const { id, email } = response.rows[0];
            const token = jwt.generateToken(id, email, "10m");
            var data = {
              to: email,
              from: EMAIL_MAILER,
              template: "forgot-password-email",
              subject: "Réinitialiser mon mot de passe",
              context: {
                url: `${BASE_URL}/auth/reset_password?token=` + token,
              },
            };
            smtpTransport.sendMail(data, function (err, info) {
              if (err) {
                console.log(err);
              } else {
                return res.json(MESSAGE.SUCCESS_SEND_MAIL);
              }
            });
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
                console.log(passwordHash);
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
