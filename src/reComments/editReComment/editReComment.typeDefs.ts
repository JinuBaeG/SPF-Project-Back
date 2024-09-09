import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editReComment(id: String!, payload: String!): MutationResponse!
  }
`;
