import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContest(contestId: String): Contest
  }
`;
