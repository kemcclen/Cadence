const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: "http://localhost:3001/callback",
});

// Generate the authorization URL for Spotify login
const generateAuthURL = () => {
  const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];
  const state = "some_random_state"; // You can generate a random string for security

  return spotifyApi.createAuthorizeURL(scopes, state);
};

// Handle the Spotify callback and exchange the authorization code for an access token
const handleSpotifyCallback = async (req, res) => {
  const { code } = req.query;

  console.log("Code:", code);

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;

    // Do something with the access token and refresh token, e.g., store them in the user's session or database
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // send the spotifyapi object back to the client and redirect to the home page
    res.status(200).json({ spotifyApi }).redirect("/");
  } catch (error) {
    console.error("Error exchanging authorization code:", error.message);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};

module.exports = { generateAuthURL, handleSpotifyCallback, spotifyApi };
