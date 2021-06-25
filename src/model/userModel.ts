const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter unique recipe name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Enter email "],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
