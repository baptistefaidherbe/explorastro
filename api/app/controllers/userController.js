const {dataUser} = require("../dataMapper/");
const bcrypt = require('bcrypt');


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
            res.json({ exploration: response.rows });
          }
        });
      },
      updateUser: (req, res) => {
        const id = Number(req.params.id);
        const {firstname, lastname, username, email, password, avatar_url, bio, city, zipcode} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
        dataUser.updateUserRequest(id, firstname, lastname, username, email, passwordHash, avatar_url, bio, city, zipcode,(error, response) => {
          if (error) {
            console.trace(error);
          } else {
            res.json('success modifications');
          }
        });
      },
      createUser: (req, res) => {
        const {firstname, lastname, username, email, password, city, zipcode} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
        dataUser.createUserRequest(firstname, lastname, username, email, passwordHash, city, zipcode,(error, response) => {
          if (error) {
            console.trace(error);
          } else {
            res.json('success modifications');
          }
        });
      },

   
  };
  
  module.exports = userController;