import { gql } from "@apollo/client";

export const SEARCH_TRACKS = gql`
  mutation trackSearch($searchTerm: String!) {
    trackSearch(searchTerm: $searchTerm) {
      trackId
      title
      artists
      previewUrl
      link
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $password: String!) {
    updateUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username) {
      _id
      username
    }
  }
`;

export const CREATE_PLAYLIST = gql`
  mutation createPlaylist(
    $name: String!
    $description: String
    $image: String
    $tracks: [String]
  ) {
    createPlaylist(
      name: $name
      description: $description
      image: $image
      tracks: $tracks
    ) {
      name
      description
      image
      tracks
    }
  }
`;
