import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createBoard(
      id: String
      title: String
      discription: String
      sortation: String
    ): Board
  }
`;
