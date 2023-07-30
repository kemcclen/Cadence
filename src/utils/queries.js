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
