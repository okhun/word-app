const mongoose2 = require("mongoose");
const wordSchema = new mongoose2.Schema();
const Word = mongoose2.model("learningwords", wordSchema);
module.exports = Word;
