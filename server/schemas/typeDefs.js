const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    playlists: [Playlist]
  }

  type Track {
    _id: ID
    title: String
    artists: [String]
    duration: String
    previewUrl: String
    link: String
    image: String
    nextTracks: [Track]
  }

  input TrackInput {
    _id: ID
    title: String
    artists: [String]
    duration: String
    previewUrl: String
    link: String
    image: String
    nextTracks: [TrackInput]
  }

  type TrackAnalysis {
    _id: ID
    danceability: Float
    energy: Float
    key: Int
    bpm: Float
    duration: Float
  }

  type OpenAIResponse {
    id: String
    title: String
    artist: String
    album: String
    duration: String
    previewUrl: String
    image: String
  }

  type Playlist {
    _id: ID
    name: String
    description: String
    images: [String]
    tracks: [Track]
    username: String
    trackCount: Int
    link: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    getTracks: [Track]
    getTrackAnalysis(trackId: String!): TrackAnalysis
    getOpenAIResponse(length: Int!, input: String!): [Track]
    login(username: String!, password: String!): Auth
    loginSpotify: String
    getUserPlaylists: [Playlist]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): Auth
    deleteUser(username: String!): User
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    trackSearch(searchTerm: String!): [Track]
    createSpotifyPlaylist(
      name: String!
      description: String
      image: String
      tracks: [TrackInput]
    ): Playlist
    savePlaylist(
      name: String!
      description: String
      images: [String]
      tracks: [TrackInput]
      link: String
    ): Playlist
  }
`;

module.exports = typeDefs;
