const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const hbs = require("nodemailer-express-handlebars");
const EMAIL_MAILER = process.env.MAILER_EMAIL_ID;
const PASSWORD_MAILER = process.env.MAILER_PASSWORD;
const BASE_URL = process.env.BASE_URL;
const nodemailer = require("nodemailer");
const { dataAuth } = require("../dataMapper/");
const path = require("path");
const MESSAGE = require("../constant/message");
const jwtSecret = process.env.TOKEN_SECRET;

const forgotPasswordController = {
  forgotPasswordTemplate: (req, res) => {
    return res.sendFile(
      path.join(__dirname, "../templates/forgot-password-email.html")
    );
  },
  resetPasswordTemplate: (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "../templates/reset-password-email.html")
    );
  },

  forgotPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

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
          console.log(response.rows.length);

          if (response.rows.length !== 0) {
            const { id, email } = response.rows[0];
            const jwtContent = {
              userEmail: email,
              userId: id,
            };
            const jwtOptions = {
              algorithm: "HS256",
              expiresIn: "10m",
            };
            const token = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);

            var data = {
              to: email,
              from: emailMailer,
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
        jsonwebtoken.verify(token, jwtSecret, (error, decodedToken) => {
          if (error) {
            return res.json(MESSAGE.INVALID_TOKEN);
          }
        });
      }
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
                return response.json(MESSAGE.SUCCESS_PASSWORD_UPDATE);
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: MESSAGE.INVALID_REQUEST,
      });
    }
  },
};

module.exports = forgotPasswordController;
