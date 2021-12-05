const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
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
  }
});

const Album = mongoose.model("Album", schema);

module.exports = Album;
