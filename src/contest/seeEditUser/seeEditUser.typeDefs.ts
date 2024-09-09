import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeEditContestUser(id: String): ContestUser
  }
`;
