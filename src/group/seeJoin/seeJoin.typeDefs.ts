import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeJoin(groupId: Int!): GroupJoinRequest
  }
`;
