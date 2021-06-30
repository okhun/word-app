import express from "express";
const userController = require("../controller/userController");
const userwordController = require("../controller/userwordController");
const authController = require("../controller/authController");
const router = express.Router();
router.route("/").post(authController.signup);
router.route("/signin").post(authController.login);
router
  .route("/:id/tokens")
  .get(authController.protect, authController.getUserToken);
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .put(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);
router
  .route("/:id/words")
  .get(authController.protect, userwordController.getUserWords);
router
  .route("/:id/words/:wordid")
  .get(authController.protect, userwordController.getUserWord)
  .post(authController.protect, userwordController.createUserWord)
  .put(authController.protect, userwordController.updateUserWord)
  .delete(authController.protect, userwordController.deleteUserWord);

module.exports = router;
