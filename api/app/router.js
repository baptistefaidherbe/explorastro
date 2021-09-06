const express = require('express');

const router = express.Router();

const explorationController = require('./controllers/explorationController');



router.get('/exploration', explorationController.getExplorations);
router.get('/exploration/:id', explorationController.getExplorationById);
router.delete('/exploration/:id', explorationController.deleteExploration);

module.exports = router;