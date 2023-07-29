const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Track } = require("../models");
const { signToken } = require("../utils/auth");
const SpotifyWebApi = require("spotify-web-api-node");

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
    trackSearch: async (parent, { searchTerm }) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: "882d508f65284f2bb6391a98aed7f619",
        clientSecret: "b2f332bfc4d94292b02881fdcfe7e939",
      });

      const data = await spotifyApi
        .clientCredentialsGrant()
        .then(function (data) {
          console.log("The access token expires in " + data.body["expires_in"]);
          console.log("The access token is " + data.body["access_token"]);

          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body["access_token"]);

          spotifyApi.searchTracks(searchTerm).then((data) => {
            const tracks = data.body.tracks.items.map((track) => {
              return {
                trackId: track.id,
                title: track.name,
                artist: track.artists[0].name,
                previewUrl: track.preview_url,
                link: track.external_urls.spotify,
              };
            });

            Track.deleteMany({});
            Track.create(tracks);
          });
        });
    },
    getTracks: async () => {
      return Track.find();
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
  },
};

module.exports = resolvers;
