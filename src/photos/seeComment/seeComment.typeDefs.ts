import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeComment(id: String): Comment
  }
`;
