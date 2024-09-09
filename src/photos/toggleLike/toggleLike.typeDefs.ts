import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleLike(id: String!): MutationResponse!
  }
`;
