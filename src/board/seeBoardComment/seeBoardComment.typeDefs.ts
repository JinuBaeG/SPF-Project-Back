import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBoardComment(id: String): BoardComment
  }
`;
