const express = require("express");

const router = express.Router();

const auth = require("./middleware/auth");
const upload = require("./middleware/multer");

const explorationController = require("./controllers/explorationController");
const userController = require("./controllers/userController");
const participateController = require("./controllers/participateController");
const commentController = require("./controllers/commentController");
const authController = require("./controllers/authController");
const forgotPasswordController = require("./controllers/forgotPaswordController");
const conversationController = require("./controllers/conversationController");
const messageController = require("./controllers/messageController");

const validate = require("./validations/validate");
const {
  userSchema,
  commentSchema,
  explorationSchema,
} = require("./validations/schemas");

router.get("/exploration", auth, explorationController.getExplorations);
router.get("/exploration/:id", auth, explorationController.getExplorationById);
router.delete(
  "/exploration/:id",
  auth,
  explorationController.deleteExploration
);
router.post(
  "/exploration",
  auth,
  validate("body", explorationSchema),
  explorationController.createExploration
);

router.post(
  "/exploration/:id/upload",
  auth,
  upload.single("image"),
  explorationController.updateExplorationImage
);
router.patch(
  "/exploration/:id",
  auth,
  validate("body", explorationSchema),
  explorationController.updateExploration
);

router.get("/user", auth, userController.getUsers);
router.get("/user/:id", auth, userController.getUserById);
router.delete("/user/:id", auth, userController.deleteUser);
router.patch(
  "/user/:id/update/info/",
  auth,
  validate("body", userSchema),
  userController.updateUserInfo
);
router.patch(
  "/user/:id/update/username",
  auth,
  validate("body", userSchema),
  userController.updateUsername
);
router.patch(
  "/user/:id/update/password",
  auth,
  validate("body", userSchema),
  userController.updatePassword
);
router.patch(
  "/user/:id/update/email",
  auth,
  validate("body", userSchema),
  userController.updateEmail
);
router.patch(
  "/user/:id/update/notification",
  auth,
  userController.updateNotification
);

router.post("/signup", validate("body", userSchema), authController.signup);
router.post("/login", validate("body", userSchema), authController.login);

router.post(
  "/participate/:exploration_id",
  auth,
  participateController.createParticipate
);
router.delete(
  "/participate/:exploration_id",
  auth,
  participateController.deleteParticipate
);

router.post(
  "/exploration/:exploration_id/comment",
  auth,
  validate("body", commentSchema),
  commentController.createComment
);
router.patch(
  "/comment/:id",
  auth,
  validate("body", commentSchema),
  commentController.updateComment
);
router.delete("/comment/:id", auth, commentController.deleteComment);

router.post(
  "/auth/forgot_password",
  validate("body", userSchema),
  forgotPasswordController.forgotPassword
);
router.patch(
  "/auth/reset_password/:token",
  validate("body", userSchema),
  forgotPasswordController.resetPassword
);

router.post("/conversation", auth, conversationController.postConversation);
router.get("/conversation/:id", auth, conversationController.getConversation);

router.post("/message", auth, messageController.postMessage);
router.get("/message/:conversationId", auth, messageController.getMessage);

module.exports = router;
