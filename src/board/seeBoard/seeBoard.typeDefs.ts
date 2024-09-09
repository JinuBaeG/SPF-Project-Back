import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBoard(id: String): Board
  }
`;
