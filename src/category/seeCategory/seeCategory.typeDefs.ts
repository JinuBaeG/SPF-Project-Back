import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCategory(offset: Int): [Category]
  }
`;
