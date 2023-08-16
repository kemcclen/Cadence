const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: "http://localhost:3001/callback",
});

// Handle the Spotify callback and exchange the authorization code for an access token
const handleSpotifyCallback = async (req, res) => {
  const { code } = req.query;

  console.log("Code:", code);

  try {
    // Exchange the authorization code for an access token
    const data = await spotifyApi.authorizationCodeGrant(code);

    // Destructure the data object
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;
    const expiresIn = data.body.expires_in;

    // Set the access and refresh tokens as cookies
    res.cookie("access_token", accessToken, {
      httpOnly: false,
      maxAge: expiresIn * 1000, // Convert to ms
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: false,
    });

    // Redirect to the React app
    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error exchanging authorization code:", error.message);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};

module.exports = { handleSpotifyCallback };
