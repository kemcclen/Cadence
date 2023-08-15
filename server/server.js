const express = require("express");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const Auth = require("./utils/auth");
const { handleSpotifyCallback } = require("./utils/spotify");
require("dotenv").config();

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Set up the cookie session middleware
const sess = {
  name: "session",
  secret: process.env.REACT_APP_SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};
app.use(cookieSession(sess));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers
    const token = req.get("authorization") || "";
    console.log("TOKEN:", token);
    return {
      user: Auth.getUser(token.replace("Bearer ", "")),
      cookies: req.cookies,
    };
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Route to generate the Spotify authorization URL
app.get("/callback", handleSpotifyCallback);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
