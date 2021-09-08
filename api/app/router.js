const express = require('express');

const router = express.Router();

const auth = require('./middleware/auth')

const explorationController = require('./controllers/explorationController');
const userController = require('./controllers/userController');
const participateController = require('./controllers/participateController');
const commentController = require('./controllers/commentController');
const authController = require('./controllers/authController');


router.get('/exploration',auth, explorationController.getExplorations);
router.get('/exploration/:id', explorationController.getExplorationById);
router.delete('/exploration/:id', explorationController.deleteExploration);
router.post('/create', explorationController.createExploration);
router.patch('/exploration/:id', explorationController.updateExploration);

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.delete('/user/:id', userController.deleteUser);
router.patch('/user/:id', userController.updateUser);

router.post('/signup', userController.createUser);
router.post('/login', authController.login);

router.post('/participate/:exploration_id', participateController.createParticipate);
router.delete('/participate/:exploration_id', participateController.deleteParticipate);

router.post('/comment/:exploration_id', commentController.createComment);
router.patch('/comment/:exploration_id', commentController.updateComment);
router.delete('/comment/', commentController.deleteComment);

module.exports = router;