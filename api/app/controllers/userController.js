const { dataUser } = require("../dataMapper/");
const bcrypt = require("bcrypt");
const MESSAGE = require("../constant/message");

const userController = {
  getUsers: (req, res) => {
    //Get all users
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

    //Get user with her id
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

    //Delete user in db
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

    //Update user infos (firstname, lastname, bios, city, zipcode) in db
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

    //Check if username exist in db
    dataUser.checkUserNameRequest(username, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        if (response.rows.length !== 0) {
          res.json(MESSAGE.USER_EXIST);
        }
      }
    });

    // if username don't exist in db => update username in db
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

    //Update password in db
    dataUser.updatePasswordRequest(id, passwordHash, (error, response) => {
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

    //Check if email exist in db
    dataUser.checkEmailRequest(email, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        if (response.rows.length !== 0) {
          res.json(MESSAGE.USER_EXIST);
        }
      }
    });

    // if email don't exist in db => update email in db
    dataUser.updateEmailRequest(id, email, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
};

module.exports = userController;
