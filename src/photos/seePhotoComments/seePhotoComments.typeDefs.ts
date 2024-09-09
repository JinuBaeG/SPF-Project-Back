import { gql } from "graphql-tag";

export default gql`
  type Query {
    seePhotoComments(id: String!, offset: Int): [Comment]
  }
`;
