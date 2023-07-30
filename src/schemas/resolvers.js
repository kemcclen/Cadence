const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Track, TrackAnalysis } = require("../models");
const { signToken } = require("../utils/auth");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    getTracks: async () => {
      return await Track.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      const thought = await Thought.create({ thoughtText, thoughtAuthor });

      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { thoughts: thought._id } }
      );

      return thought;
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
    trackSearch: async (parent, { searchTerm }) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      });

      spotifyApi.clientCredentialsGrant().then(async (data) => {
        console.log("The access token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body["access_token"]);

        await Track.deleteMany({});

        spotifyApi.searchTracks(searchTerm).then(async (data) => {
          return await Track.insertMany(
            data.body.tracks.items.map((track) => {
              return {
                trackId: track.id,
                title: track.name,
                artists: track.artists.map((artist) => artist.name),
                previewUrl: track.preview_url,
                link: track.external_urls.spotify,
              };
            })
          );
        });
      });
    },
    getTrackAnalysis: async (parent, { trackId }) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      });

      spotifyApi.clientCredentialsGrant().then(async (data) => {
        console.log("The access token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body["access_token"]);

        const track = await Track.findOne({ trackId });

        if (!track) {
          throw new Error("No track found with this ID");
        }

        await TrackAnalysis.deleteMany({});

        spotifyApi.getAudioFeaturesForTrack(track.trackId).then((data) => {
          return TrackAnalysis.create({
            trackId: track.trackId,
            danceability: data.body.danceability,
            energy: data.body.energy,
            key: data.body.key,
            bpm: data.body.tempo,
            duration: data.body.duration_ms,
          });
        });
      });
    },
  },
};

module.exports = resolvers;
