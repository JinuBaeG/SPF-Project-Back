import { gql } from "graphql-tag";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    naverAccount(
      username: String!
      email: String!
      password: String!
      phoneNumber: String!
      interlock: String
      uid: String
      privacyAccess: Boolean
      usetermAccess: Boolean
    ): CreateAccountResult!
  }
`;
