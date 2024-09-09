import { gql } from "graphql-tag";

export default gql`
  type Query {
    searchContestUser(
      email: String
      username: String
      phoneNumber: String
    ): [User]
  }
`;
