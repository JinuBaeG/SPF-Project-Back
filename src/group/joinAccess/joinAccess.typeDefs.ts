import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    joinAccess(id: Int!, groupId: Int!): MutationResponse!
  }
`;
