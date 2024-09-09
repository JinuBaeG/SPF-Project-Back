import { gql } from "graphql-tag";

export default gql`
  type Query {
    seePhotoLikes(id: String!): [User]
  }
`;
