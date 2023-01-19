import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeGroups(offset: Int!): [Group]
  }
`;
