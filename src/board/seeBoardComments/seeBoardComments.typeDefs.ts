import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBoardComments(id: String!, offset: Int): [BoardComment]
  }
`;
