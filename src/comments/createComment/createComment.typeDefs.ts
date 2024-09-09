import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createComment(photoId: String!, payload: String!): MutationResponse!
  }
`;
