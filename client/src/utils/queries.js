import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
      password
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      username
      email
      password
    }
  }
`;

export const GET_TRACKS = gql`
  query getTracks {
    getTracks {
      _id
      trackId
      title
      artists
      previewUrl
      link
      image
      nextTracks {
        _id
        trackId
        title
        artists
        previewUrl
        link
        image
      }
    }
  }
`;

export const GET_TRACK_ANALYSIS = gql`
  query getTrackAnalysis($trackId: String!) {
    getTrackAnalysis(trackId: $trackId) {
      trackId
      danceability
      energy
      key
      bpm
      duration
    }
  }
`;

export const GET_OPENAI_RESPONSE = gql`
  query getOpenAIResponse($length: Int!, $input: String!) {
    getOpenAIResponse(length: $length, input: $input) {
      trackId
      title
      artists
      duration
      previewUrl
      link
      image
      nextTracks {
        trackId
        title
        artists
        duration
        previewUrl
        link
        image
      }
    }
  }
`;

export const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const LOGIN_SPOTIFY = gql`
  query loginSpotify {
    loginSpotify
  }
`;

export const GET_USER_PLAYLISTS = gql`
  query getUserPlaylists {
    getUserPlaylists {
      _id
      name
      description
      images
      tracks {
        _id
        trackId
        title
        artists
        previewUrl
        link
        image
        nextTracks {
          _id
          trackId
          title
          artists
          previewUrl
          link
          image
        }
      }
      username
      trackCount
      link
    }
  }
`;
