const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  trackId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  artists: [
    {
      type: String,
    },
  ],
  duration: {
    type: String,
  },
  previewUrl: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
  nextTracks: {
    type: Array,
  },
});

const Track = model("Track", trackSchema);

module.exports = Track;
