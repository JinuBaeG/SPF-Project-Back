import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editBoardReComment(id: String!, payload: String!): MutationResponse!
  }
`;
