import { gql } from "apollo-server-express";

export default gql`
  type MutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }

  type Tag {
    id: Int
    name: String
    createdAt: String!
    updatedAt: String!
  }

  type SportsEvent {
    id: Int
    name: String
    createdAt: String!
    updatedAt: String!
  }
`;
