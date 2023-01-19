import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
  }
`;
