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
        const promo_id = Number(req.params.id);
        dataUser.getUserByIdRequest(promo_id, (error, response) => {
          if (error) {
            console.trace(error);
          } else {
            res.json({ exploration: response.rows[0] });
          }
        });
      },
   
  };
  
  module.exports = userController;