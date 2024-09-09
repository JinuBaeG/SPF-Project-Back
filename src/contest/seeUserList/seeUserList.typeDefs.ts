import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserList(contestId: String): [ContestUser]
  }
`;
