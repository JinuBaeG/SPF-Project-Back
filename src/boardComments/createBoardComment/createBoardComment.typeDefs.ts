import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createBoardComment(boardId: String!, payload: String!): MutationResponse!
  }
`;
