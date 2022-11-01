import { gql } from "apollo-server-express";

export default gql`
  type SeaerchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    searchUsers(keyword: String!, lastId: Int): SeaerchUsersResult!
  }
`;
