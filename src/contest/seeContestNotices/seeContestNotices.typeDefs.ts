import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestNotices(contestId: String): [ContestNotice]
  }
`;
