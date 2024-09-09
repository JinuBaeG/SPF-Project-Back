import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNotices(id: String, sortation: String, offset: Int): [Notice]
  }
`;
