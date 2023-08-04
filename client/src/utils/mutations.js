import { gql } from "@apollo/client";

export const SEARCH_TRACKS = gql`
  mutation trackSearch($searchTerm: String!) {
    trackSearch(searchTerm: $searchTerm) {
      title
      artists
      previewUrl
      link
      image
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
