const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const express = require("express");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter unique recipe name"],
  },
  email: {
    type: String,
    required: [true, "Enter email "],
    unique: [true, "Enter unique email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
    minlength: 8,
    select: false,
  },
});
userSchema.pre("save", async function (this: any, next: any) {
  // Only run this function if password is actually modified
  if (!this.isModified("password")) return next();
  // Hash the password the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword: any,
  userPassword: any
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
