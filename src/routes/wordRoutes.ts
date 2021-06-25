import express from "express";
const wordController = require("../controller/wordController");
const router = express.Router();

router.route("/").get(wordController.getAllword);
router.route("/:id").get(wordController.getWord);

module.exports = router;
