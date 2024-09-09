import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    boardToggleLike(id: String!): MutationResponse!
  }
`;
