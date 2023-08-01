const { Schema, model } = require("mongoose");

const trackAnalysisSchema = new Schema({
  trackId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  danceability: {
    type: Number,
    required: true,
  },
  energy: {
    type: Number,
    required: true,
  },
  key: {
    type: Number,
    required: true,
  },
  bpm: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const TrackAnalysis = model("TrackAnalysis", trackAnalysisSchema);

module.exports = TrackAnalysis;
