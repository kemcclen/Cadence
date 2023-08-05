const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  tracks: [
    {
      type: String,
    },
  ],
  link: {
    type: String,
  },
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
