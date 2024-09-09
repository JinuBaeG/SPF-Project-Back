import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteBoardComment(id: String!): MutationResponse!
  }
`;
