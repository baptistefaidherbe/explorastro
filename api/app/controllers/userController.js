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
    const { firstname, lastname, bio, city, zipcode, avatar_url } = req.body;

    if (!firstname || !lastname || !bio || !city || !zipcode) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

    dataUser.updateUserRequest(
      id,
      firstname,
      lastname,
      bio,
      city,
      zipcode,
      avatar_url,
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

    if (!username) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

    //Check if username exist in db
    dataUser.checkUserNameRequest(username, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        if (response.rows.length !== 0) {
          res.json(MESSAGE.USER_EXIST);
        } else {
          // if username don't exist in db => update username in db
          dataUser.updateUserNameRequest(id, username, (error, response) => {
            if (error) {
              console.trace(error);
            } else {
              res.json(MESSAGE.SUCCESS_MODIFICATION);
            }
          });
        }
      }
    });
  },

  updatePassword: (req, res) => {
    const id = Number(req.params.id);
    const { password } = req.body;

    if (!password) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

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

    if (!email) {
      return res.json(MESSAGE.MISSING_FIEDLS);
    }

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
