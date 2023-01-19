import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    joinGroup(id: Int!): MutationResponse!
  }
`;
