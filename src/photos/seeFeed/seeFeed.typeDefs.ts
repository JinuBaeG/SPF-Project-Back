import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFeed(offset: Int!, sportsEvent: String, category: String): [Photo]
  }
`;
