const express = require('express');

const router = express.Router();

const auth = require('./middleware/auth')

const explorationController = require('./controllers/explorationController');
const userController = require('./controllers/userController');
const participateController = require('./controllers/participateController');
const commentController = require('./controllers/commentController');
const authController = require('./controllers/authController');
const forgotPasswordController = require('./controllers/forgotPaswordController');


router.get('/exploration',auth, explorationController.getExplorations);
router.get('/exploration/:id',auth, explorationController.getExplorationById);
router.delete('/exploration/:id',auth, explorationController.deleteExploration);
router.post('/exploration',auth, explorationController.createExploration);
router.patch('/exploration/:id',auth, explorationController.updateExploration);

router.get('/user',auth, userController.getUsers);
router.get('/user/:id',auth, userController.getUserById);
router.delete('/user/:id',auth, userController.deleteUser);
router.patch('/user/:id',auth, userController.updateUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/participate/:exploration_id',auth, participateController.createParticipate);
router.delete('/participate/:exploration_id',auth, participateController.deleteParticipate);

router.post('/comment/:exploration_id',auth, commentController.createComment);
router.patch('/comment/:exploration_id',auth, commentController.updateComment);
router.delete('/comment/',auth, commentController.deleteComment);


router.get('/auth/forgot_password',forgotPasswordController.forgotPasswordTemplate)
router.post('/auth/forgot_password',forgotPasswordController.forgotPassword);

router.patch('/auth/reset_password/:token',forgotPasswordController.resetPassword);



module.exports = router;