const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Track {
    _id: ID
    trackId: String
    title: String
    artists: [String]
    previewUrl: String
    link: String
    nextTracks: [Track]
  }

  type TrackAnalysis {
    _id: ID
    trackId: String
    danceability: Float
    energy: Float
    key: Int
    bpm: Float
    duration: Float
  }

  type OpenAIResponse {
    id: Int
    title: String
    artist: String
    album: String
    duration: String
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
    getOpenAIResponse(length: Int!, input: String!): [OpenAIResponse]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): Auth
    deleteUser(username: String!): User
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    trackSearch(searchTerm: String!): [Track]
  }
`;

module.exports = typeDefs;
