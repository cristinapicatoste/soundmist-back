const mongoose = require("mongoose");
const User = mongoose.model('User');
const Playlist = mongoose.model('Playlist');

const schema = new mongoose.Schema({
  id_playlist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Playlist',
  },
  id_user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }
});

const FavouritePlaylists = mongoose.model("FavouritePlaylists", schema);

module.exports = FavouritePlaylists;
