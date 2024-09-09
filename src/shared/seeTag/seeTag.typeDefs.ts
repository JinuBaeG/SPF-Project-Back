import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeTag(sortation: String): [Tag]
  }
`;
