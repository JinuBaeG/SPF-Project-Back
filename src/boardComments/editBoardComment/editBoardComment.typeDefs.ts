import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editBoardComment(id: String!, payload: String!): MutationResponse!
  }
`;
