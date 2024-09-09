import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editConfig(
      id: String
      privacyTerms: String
      gpsTerms: String
      useTerms: String
      businessInfo: String
    ): MutationResponse
  }
`;
