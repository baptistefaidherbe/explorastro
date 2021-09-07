const dataMapper = require("../dataMapper/dataExploration.js");

const userController = {
    getUsers: (req, res) => {
      dataMapper.getUsersRequest((error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json({ users: response.rows });
        }
      });
    },
    getExplorationById: (req, res) => {
      const promo_id = Number(req.params.id);
      dataMapper.getExplorationByIdRequest(promo_id, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json({ exploration: response.rows[0] });
        }
      });
    },
    deleteExploration: (req, res) => {
      const id = Number(req.params.id);
      dataMapper.deleteExplorationRequest(id, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json({ exploration: response.rows[0] });
        }
      });
    },
    createExploration: (req, res) => {
      const { name, author_id } = req.body;
      dataMapper.createExplorationRequest(name, author_id, (error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json({ exploration: response.rows[0] });
        }
      });
    },
    updateExploration: (req, res) => {
      const id = Number(req.params.id);
      const {name, description, geog, date, max_participants, is_published} = req.body;
      dataMapper.updateExplorationRequest(id, name, description, geog, date, max_participants, is_published,(error, response) => {
        if (error) {
          console.trace(error);
        } else {
          res.json({ exploration: response.rows[0] });
        }
      });
    },
  };
  
  module.exports = userController;