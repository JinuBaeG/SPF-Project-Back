import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestReport(
      contestId: String
      reportType: String
      reportTitle: String
      reportDiscription: String
    ): MutationResponse
  }
`;
