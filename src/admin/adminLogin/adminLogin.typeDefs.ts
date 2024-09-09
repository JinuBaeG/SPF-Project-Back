import { gql } from "graphql-tag";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    adminLogin(id: String!, password: String!): LoginResult!
  }
`;
