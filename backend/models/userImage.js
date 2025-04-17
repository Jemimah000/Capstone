// models/Avatar.js
const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: true
     },
  frontImage: { 
     type: String, 
     required: true
 },
  leftImage: { 
    type: String,
    required: true
 },
  rightImage: {
     type: String, 
     required: true
    },
  createdAt: {
     type: Date, 
     default: Date.now
     }
});

module.exports = mongoose.model('userImage', userImageSchema);