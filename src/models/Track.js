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
  artists: {
    type: Array,
    required: true,
  },
  previewUrl: {
    type: String,
  },
  link: {
    type: String,
  },
  nextTracks: {
    type: Array,
  },
});

const Track = model("Track", trackSchema);

module.exports = Track;
