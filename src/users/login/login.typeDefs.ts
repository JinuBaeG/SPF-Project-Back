import { gql } from "graphql-tag";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(email: String!, password: String!): LoginResult!
  }
`;
