const express = require('express');

const router = express.Router();

const explorationController = require('./controllers/explorationController');



router.get('/exploration', explorationController.getExplorations);


module.exports = router;