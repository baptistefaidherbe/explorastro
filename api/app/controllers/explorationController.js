const {dataExploration} = require("../dataMapper/");

const explorationController = {
  getExplorations: (req, res) => {
    dataExploration.getExplorationsRequest((error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ explorations: response.rows });
      }
    });
  },
  getExplorationById: (req, res) => {
    const promo_id = Number(req.params.id);
    dataExploration.getExplorationByIdRequest(promo_id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ exploration: response.rows[0] });
      }
    });
  },
  deleteExploration: (req, res) => {
    const id = Number(req.params.id);
    dataExploration.deleteExplorationRequest(id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ exploration: response.rows });
      }
    });
  },
  createExploration: (req, res) => {
    const { name, author_id } = req.body;
    dataExploration.createExplorationRequest(name, author_id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json('succes creation event');
      }
    });
  },
  updateExploration: (req, res) => {
    const id = Number(req.params.id);
    const {name, description, geog, date, max_participants, is_published} = req.body;
    dataExploration.updateExplorationRequest(id, name, description, geog, date, max_participants, is_published,(error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json('success modifications');
      }
    });
  },
};

module.exports = explorationController;
