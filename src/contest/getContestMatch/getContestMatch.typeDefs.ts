import { gql } from "graphql-tag";

export default gql`
  type Query {
    getContestMatch(contestId: String): Contest
  }
`;
