const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;