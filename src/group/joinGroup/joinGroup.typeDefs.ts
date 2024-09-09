import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    joinGroup(id: String!): MutationResponse!
  }
`;
