import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBoardReComments(id: String!, offset: Int): [BoardReComment]
  }
`;
