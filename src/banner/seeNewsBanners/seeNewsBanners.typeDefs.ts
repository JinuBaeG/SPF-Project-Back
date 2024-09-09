import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNewsBanner(offset: Int, sortation: String): [Banner]
  }
`;
