import { gql } from "graphql-tag";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
    id: String!
  }
  type Mutation {
    editProfile(
      id: String!
      username: String
      avatar: Upload
      gender: String
    ): EditProfileResult!
  }
`;
