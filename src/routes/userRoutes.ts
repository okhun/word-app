import express from "express";
const userController = require("../controller/userController");
const userwordController = require("../controller/userwordController");
const router = express.Router();

router.route("/").post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/:id/words").get(userwordController.getUserWords);
router
  .route("/:id/words/:wordid")
  .get(userwordController.getUserWord)
  .post(userwordController.createUserWord)
  .put(userwordController.updateUserWord)
  .delete(userwordController.deleteUserWord);

module.exports = router;
