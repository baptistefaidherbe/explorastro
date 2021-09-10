const EMAIL_MAILER = process.env.MAILER_EMAIL_ID;
const PASSWORD_MAILER = process.env.MAILER_PASSWORD;
const BASE_URL = process.env.BASE_URL;
const MESSAGE = require('../constant/message');
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

module.exports = {
  sendMail: (email, token) => {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_MAILER,
        pass: PASSWORD_MAILER,
      },
    });

    const handlebarsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "../templates"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "../templates"),
      extName: ".html",
    };

    smtpTransport.use("compile", hbs(handlebarsOptions));

    const data = {
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
  },
};
