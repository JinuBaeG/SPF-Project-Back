import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    joinDenied(id: Int!, groupId: Int!): MutationResponse!
  }
`;
