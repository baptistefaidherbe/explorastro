const express = require('express');

const router = express.Router();

const explorationController = require('./controllers/explorationController');
const userController = require('./controllers/userController');



router.get('/exploration', explorationController.getExplorations);
router.get('/exploration/:id', explorationController.getExplorationById);
router.delete('/exploration/:id', explorationController.deleteExploration);
router.post('/create', explorationController.createExploration);
router.patch('/exploration/:id', explorationController.updateExploration);

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);

module.exports = router;