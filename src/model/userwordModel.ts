const mongoose3 = require("mongoose");
const userwordSchema = new mongoose3.Schema({
  userId: { type: String },
  wordId: { type: String },
  word: {
    difficulty: { type: String },
    optional: {
      testFieldString: { type: String },
      testFieldBoolean: { type: Boolean },
    },
  },
});
const Userword = mongoose3.model("words", userwordSchema);
module.exports = Userword;
