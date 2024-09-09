import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editComment(id: String!, payload: String!): MutationResponse!
  }
`;
