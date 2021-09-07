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
   
  };
  
  module.exports = userController;