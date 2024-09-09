import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeUserFeed(offset: Int!, id: String): [Photo]
  }
`;
