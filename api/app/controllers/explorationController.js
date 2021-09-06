const dataMapper = require("../dataMapper.js");

const explorationController = {
  getExplorations: (req, res) => {
    dataMapper.getExplorationsRequest((error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ explorations: response.rows });
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
    const promo_id = Number(req.params.id);
    dataMapper.deleteExplorationRequest(promo_id, (error, response) => {
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
};

module.exports = explorationController;
