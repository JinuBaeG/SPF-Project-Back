import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNotice(id: String): Notice
  }
`;
