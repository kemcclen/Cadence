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
      type: Schema.Types.ObjectId,
      ref: "Track",
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
  return this.tracks ? this.tracks.length : 0;
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
