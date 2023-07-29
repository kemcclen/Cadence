import { gql } from "@apollo/client";

export const QUERY_TRACKS = gql`
  query trackSearch($searchTerm: String!) {
    trackSearch(searchTerm: $searchTerm) {
      artist
      title
    }
  }
`;
