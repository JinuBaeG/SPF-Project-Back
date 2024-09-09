import { gql } from "graphql-tag";

export default gql`
  type Query {
    findAccountFromEmail(email: String): User
  }
`;
