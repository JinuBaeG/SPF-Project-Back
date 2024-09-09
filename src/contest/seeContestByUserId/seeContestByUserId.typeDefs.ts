import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestByUserId(userId: String): [Contest]
  }
`;
