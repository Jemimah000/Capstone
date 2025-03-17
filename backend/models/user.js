const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt & updatedAt timestamps

// Create the User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
