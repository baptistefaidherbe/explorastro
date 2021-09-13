const {dataExploration} = require("../dataMapper/");
const MESSAGE = require("../constant/message");

const explorationController = {
  getExplorations: (req, res) => {

    //Get all explorations
    dataExploration.getExplorationsRequest((error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ explorations: response.rows });
      }
    });
  },
  getExplorationById: (req, res) => {
    const id = Number(req.params.id);

    //Get one exploration with her id
    dataExploration.getExplorationByIdRequest(id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ exploration: response.rows[0] });
      }
    });
  },
  deleteExploration: (req, res) => {
    const id = Number(req.params.id);

    //Delete exploration in db
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

    //Create exploration in db
    dataExploration.createExplorationRequest(name, author_id, (error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_CREATION_EVENT);
      }
    });
  },
  updateExploration: (req, res) => {
    const id = Number(req.params.id);
    const {name, description, geog, date, max_participants, is_published,image_url} = req.body;

    //Update exploration in db
    dataExploration.updateExplorationRequest(id, name, description, geog, date, max_participants, is_published,image_url,(error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json(MESSAGE.SUCCESS_MODIFICATION);
      }
    });
  },
};

module.exports = explorationController;
