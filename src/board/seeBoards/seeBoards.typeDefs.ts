import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBoards(id: String, sortation: String, offset: Int): [Board]
  }
`;
