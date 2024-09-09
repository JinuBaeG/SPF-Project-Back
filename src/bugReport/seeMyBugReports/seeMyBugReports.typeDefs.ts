import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMyBugReports(offset: Int): [BugReport]
  }
`;
