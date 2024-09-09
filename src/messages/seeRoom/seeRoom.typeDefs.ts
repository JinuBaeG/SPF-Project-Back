import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeRoom(id: String!): Room
  }
`;
