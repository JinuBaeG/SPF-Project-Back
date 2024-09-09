import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMyBugReport(id: String): BugReport
  }
`;
