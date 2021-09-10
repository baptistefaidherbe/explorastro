const { dataUser } = require("../dataMapper/");
const bcrypt = require("bcrypt");
const MESSAGE = require("../constant/message");

const userController = {
  getUsers: (req, res) => {
    dataUser.getUsersRequest((error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ users: response.rows });
      }
    });
  },
  getUserById: (req, res) => {
    const id = Number(req.params.id);
    dataUser.getUserByIdRequest(id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ exploration: response.rows[0] });
      }
    });
  },
  deleteUser: (req, res) => {
    const id = Number(req.params.id);
    dataUser.deleteUserRequest(id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
  updateUserInfo: (req, res) => {
    const id = Number(req.params.id);
    const { firstname, lastname, bio, city, zipcode } = req.body;
    dataUser.updateUserRequest(
      id,
      firstname,
      lastname,
      bio,
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
  updateUsername: (req, res) => {
    const id = Number(req.params.id);
    const { username } = req.body;

    dataUser.checkUserNameRequest(username, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        if (response.rows.length !== 0) {
          res.json(MESSAGE.USER_EXIST);
        }
      }
    });

    dataUser.updateUserNameRequest(id, username, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
  updatePassword: (req, res) => {
  const id = Number(req.params.id);
  const { password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
  dataUser.updatePasswordRequest(id, passwordHash,(error, response) => {
    if (error) {
      console.trace(error);
    } else {
      res.json(MESSAGE.SUCCESS_MODIFICATION);
    }
  });
},
updateEmail: (req, res) => {
    const id = Number(req.params.id);
    const { email } = req.body;
    dataUser.checkEmailRequest(email, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          if (response.rows.length !== 0) {
            res.json(MESSAGE.USER_EXIST);
          }
        }
      });

    dataUser.updateEmailRequest(id, email,(error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
};

module.exports = userController;
