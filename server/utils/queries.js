import { gql } from "@apollo/client";

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
