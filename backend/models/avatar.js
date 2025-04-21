const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true
 },
  avatarUrl: { 
    type: String,
    required: true
 },
 
}, { timestamps: true });

const Avatar = mongoose.model("Avatar", AvatarSchema);

module.exports = Avatar;
