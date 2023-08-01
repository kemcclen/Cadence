const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/",
});

export default spotifyApi;
