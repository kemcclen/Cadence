import { gql } from "@apollo/client";

export const SEARCH_TRACKS = gql`
  mutation trackSearch($searchTerm: String!) {
    trackSearch(searchTerm: $searchTerm) {
      title
      artists
      previewUrl
      link
    }
  }
`;

export const GET_TRACK_ANALYSIS = gql`
  mutation getTrackAnalysis($trackId: String!) {
    getTrackAnalysis(trackId: $trackId) {
      danceability
      energy
      key
      bpm
      duration
    }
  }
`;
