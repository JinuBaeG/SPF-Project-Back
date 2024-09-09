import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeGroupTag(offset: Int): [Tag]
  }
`;
