import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createReComment(commentId: String!, payload: String!): MutationResponse!
  }
`;
