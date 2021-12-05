const mongoose = require("mongoose");
const User = mongoose.model('User');

const schema = new mongoose.Schema({
  followed: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  follower: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }
});

const Follower = mongoose.model("Follower", schema);

module.exports = Follower;