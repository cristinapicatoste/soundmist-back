const mongoose = require("mongoose");
const Song = mongoose.model('Song');
const Playlist = mongoose.model('Playlist');

const schema = new mongoose.Schema({
    id_playlist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Playlist',
    },
    id_song: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
    }
});

const SongsInPlaylist = mongoose.model("SongsInPlaylist", schema);

module.exports = SongsInPlaylist;
