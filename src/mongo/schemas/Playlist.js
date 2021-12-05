const mongoose = require("mongoose");
const User = mongoose.model('User');
const Song = mongoose.model('Song');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
  },
  id_owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isFav: {
    type: Boolean,
    default: false
  }
});

const Playlist = mongoose.model("Playlist", schema);

module.exports = Playlist;
