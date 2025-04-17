const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  frontImage: {
    type: String,
    default: null,  
  },
  leftImage: {
    type: String,
    default: null,  
  },
  rightImage: {
    type: String,
    default: null,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('userImage', userImageSchema);
