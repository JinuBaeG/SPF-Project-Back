import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    withdrawGroup(id: Int!): MutationResponse!
  }
`;
