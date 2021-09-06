const dataMapper = require("../dataMapper.js");

const explorationController = {
  getExplorations: (req, res) => {
    dataMapper.getExplorationsRequest((error, response) => {
      if (error) {
        console.trace(error);
      } else {
        res.json({ exploration : response.rows });
      }
    });
  },
};

module.exports = explorationController;
