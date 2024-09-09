import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteReComment(id: String!): MutationResponse!
  }
`;
