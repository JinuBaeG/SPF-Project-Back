import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeGroup(id: String!): Group
  }
`;
