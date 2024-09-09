import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteBoardReComment(id: String!): MutationResponse!
  }
`;
