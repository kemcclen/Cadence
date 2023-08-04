const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Track } = require("../models");
const { signToken } = require("../utils/auth");
const SpotifyWebApi = require("spotify-web-api-node");
const querystring = require("querystring");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Helper function to generate a random string for the state parameter
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

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
    getTrackAnalysis: async (parent, { trackId }) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      });

      // Ensure we have a valid access token before making the API call
      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body["access_token"]);

      const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(trackId);

      return {
        trackId: trackId,
        danceability: audioFeatures.body.danceability,
        energy: audioFeatures.body.energy,
        key: audioFeatures.body.key,
        bpm: audioFeatures.body.tempo,
        duration: audioFeatures.body.duration_ms,
      };
    },
    getOpenAIResponse: async (parent, { length, input }) => {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      try {
        const chatCompletion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `You are an assistant that only responds in JSON.
      Create a list of ${length} unique songs based off the following
      statement: "${input}". Include "id", "title", "artist", "album", and "duration"
      in your response. An example response is: "
      [
        {
            "id": 1,
            "title": "Hey Jude",
            "artist": "The Beatles",
            "album": "The Beatles (White Album)",
            "duration": "4:56"
        }
      ]".`,
          temperature: 0,
          max_tokens: 3000,
        });
        // get the songs from the response
        const songs = JSON.parse(chatCompletion.data.choices[0].text);

        // get the preview urls for each song
        const spotifyApi = new SpotifyWebApi({
          clientId: process.env.REACT_APP_CLIENT_ID,
          clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        });

        // Ensure we have a valid access token before making the API call
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body["access_token"]);

        // iterate through the songs and add the preview url and image to each song
        for (song in songs) {
          const searchResults = await spotifyApi.searchTracks(
            songs[song].title + " " + songs[song].artist
          );

          songs[song].previewUrl =
            searchResults.body.tracks.items[0].preview_url;

          songs[song].image =
            searchResults.body.tracks.items[0].album.images[0].url;
        }

        let results = [];

        // iterate through the songs and create a new array of OpenAIResponse objects
        for (song in songs) {
          results.push({
            id: songs[song].id,
            title: songs[song].title,
            artist: songs[song].artist,
            album: songs[song].album,
            duration: songs[song].duration,
            previewUrl: songs[song].previewUrl,
            image: songs[song].image,
          });
        }

        console.log("RESULTS", results);

        return results;
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(error.message);
        }
      }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

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
    loginSpotify: async () => {
      const state = generateRandomString(16);
      const scopes = "playlist-modify-public playlist-modify-private";

      const authURL =
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.REACT_APP_CLIENT_ID,
          scope: scopes,
          redirect_uri: "http://localhost:3001/callback",
          state: state,
        });

      return authURL;
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });

      console.log("USER", user);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email, password }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { email, password },
        { new: true }
      );

      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { username }) => {
      const user = await User.findOneAndDelete({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }

      return user;
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
      await Track.deleteMany({});

      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      });

      const data = await spotifyApi.clientCredentialsGrant();
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);

      const searchResults = await spotifyApi.searchTracks(searchTerm);

      return await Track.insertMany(
        searchResults.body.tracks.items.map((track) => {
          return {
            trackId: track.id,
            title: track.name,
            artists: track.artists.map((artist) => artist.name),
            previewUrl: track.preview_url,
            link: track.external_urls.spotify,
          };
        })
      );
    },
    createPlaylist: async (
      parent,
      { name, description, image, tracks },
      context
    ) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      });

      // Ensure we have a valid access token before making the API call
      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);

      const user = await spotifyApi.getMe();

      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }

      const playlist = await spotifyApi.createPlaylist(user.body.id, name, {
        description: description,
      });

      const playlistId = playlist.body.id;

      console.log("PLAYLIST", playlist.body);

      if (image) {
        await spotifyApi.uploadCustomPlaylistCoverImage(playlistId, image);
      }

      if (tracks) {
        const tracksToAdd = tracks.map((track) => track.trackId);
        await spotifyApi.addTracksToPlaylist(playlistId, tracksToAdd);
      }

      return {
        id: playlistId,
        name: name,
        description: description,
        image: image,
        tracks: tracks,
        username: user.body.id,
        trackCount: tracks.length,
      };
    },
  },
};

module.exports = resolvers;
