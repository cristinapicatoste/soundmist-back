const mongoose = require("mongoose");
const User = mongoose.model('User');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isFav: {
    type: Boolean,
    default: false,
    required: true
  },
  id_author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  trackId: {
    type: String,
    ref: "trackId",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: true
  },
  isFav: {
    type: Boolean,
    default: false
  }
});

const Song = mongoose.model("Song", schema);

module.exports = Song;