import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    uploadPhoto(
      files: [Upload]
      caption: String
      sortation: String
      publicLevel: String
      sportsEvent: String
      feedCategory: String
    ): Photo
  }
`;
