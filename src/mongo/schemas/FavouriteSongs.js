const mongoose = require("mongoose");
const User = mongoose.model('User');
const Song = mongoose.model('Song');

const schema = new mongoose.Schema({
  id_song: {
    type: mongoose.Schema.ObjectId,
    ref: 'Song',
  },
  id_user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }
});

const FavouriteSongs = mongoose.model("FavouriteSongs", schema);

module.exports = FavouriteSongs;
