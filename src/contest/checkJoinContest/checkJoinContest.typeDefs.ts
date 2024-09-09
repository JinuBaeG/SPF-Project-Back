import { gql } from "graphql-tag";

export default gql`
  type Query {
    checkJoinContest(contestId: String, userId: String): ContestUser
  }
`;
