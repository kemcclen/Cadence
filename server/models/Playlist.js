const { Schema, model } = require("mongoose");
const Track = require("./Track");

const playlistSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  tracks: [
    {
      type: String,
    },
  ],
  username: {
    type: String,
    ref: "User",
  },
});

playlistSchema.virtual("trackCount").get(function () {
  return this.tracks.length;
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
