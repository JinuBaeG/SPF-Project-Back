import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUser(id: String): User
  }
`;
