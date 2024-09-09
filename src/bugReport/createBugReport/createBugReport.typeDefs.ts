import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createBugReport(
      reportTitle: String
      reportDiscription: String
      bugReportImage: [Upload]
    ): MutationResponse
  }
`;
