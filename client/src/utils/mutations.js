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

export const CREATE_SPOTIFY_PLAYLIST = gql`
  mutation createSpotifyPlaylist(
    $name: String!
    $description: String
    $image: String
    $tracks: [TrackInput]
  ) {
    createSpotifyPlaylist(
      name: $name
      description: $description
      image: $image
      tracks: $tracks
    ) {
      _id
      name
      description
      images
      tracks {
        title
        artists
        duration
        previewUrl
        link
        image
        nextTracks {
          title
          artists
          duration
          previewUrl
          link
          image
        }
      }
    }
  }
`;

export const SAVE_PLAYLIST = gql`
  mutation savePlaylist(
    $name: String!
    $description: String
    $images: [String]
    $tracks: [TrackInput]
    $link: String
  ) {
    savePlaylist(
      name: $name
      description: $description
      images: $images
      tracks: $tracks
      link: $link
    ) {
      _id
      name
      description
      images
      tracks {
        title
        artists
        duration
        previewUrl
        link
        image
        nextTracks {
          title
          artists
          duration
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

export const DELETE_PLAYLIST = gql`
  mutation deletePlaylist($playlistId: ID!) {
    deletePlaylist(playlistId: $playlistId) {
      _id
      name
      description
      images
      tracks {
        title
        artists
        duration
        previewUrl
        link
        image
        nextTracks {
          title
          artists
          duration
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
