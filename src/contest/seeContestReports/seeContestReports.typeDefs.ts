import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestReports(contestId: String): [ContestNotice]
  }
`;
