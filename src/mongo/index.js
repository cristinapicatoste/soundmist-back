require('./connection');
const User = require('./schemas/User');
const Song = require('./schemas/Song');
const Playlist = require('./schemas/Playlist');
const Follower = require('./schemas/Follower');
const FavouriteSongs = require('./schemas/FavouriteSongs');
const FavouritePlaylists = require('./schemas/FavouritePlaylists');
const SongsInPlaylist = require('./schemas/SongsInPlaylist');

const { initFirstUser } = require('./initFirstUser');

initFirstUser(User);

module.exports = {
  user: User,
  song: Song,
  playlist: Playlist,
  follower: Follower,
  favouritesongs: FavouriteSongs,
  favouriteplaylists: FavouritePlaylists,
  songsinplaylist: SongsInPlaylist
}
