import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editContestReport(
      id: String
      contestId: String
      reportTitle: String
      reportDiscription: String
    ): MutationResponse
  }
`;
