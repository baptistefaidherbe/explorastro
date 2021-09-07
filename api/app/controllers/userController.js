const {dataUser} = require("../dataMapper/");


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
        const {firstname, lastname, username, email, password, avatar_url, bio, city,zipcode} = req.body;
        dataUser.updateUserRequest(id, firstname, lastname, username, email, password, avatar_url, bio, city, zipcode,(error, response) => {
          if (error) {
            console.trace(error);
          } else {
            res.json('success modifications');
          }
        });
      },
   
  };
  
  module.exports = userController;