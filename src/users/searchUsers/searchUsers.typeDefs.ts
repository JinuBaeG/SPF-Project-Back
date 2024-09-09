import { gql } from "graphql-tag";

export default gql`
  type SeaerchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    searchUsers(keyword: String!, lastId: String): SeaerchUsersResult!
  }
`;
