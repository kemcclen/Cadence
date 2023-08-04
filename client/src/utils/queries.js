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
      trackId
      title
      artists
      previewUrl
      link
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
      id
      title
      artist
      album
      duration
      previewUrl
      image
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
  query loginSpotify() {
    loginSpotify
  }
`;
