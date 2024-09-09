import { gql } from "graphql-tag";

export default gql`
  type AdminUser {
    id: String
    userId: String
    password: String
    email: String
    phoneNumber: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    adminUsers: [AdminUser]
    adminUser(id: String!): AdminUser
  }
`;
