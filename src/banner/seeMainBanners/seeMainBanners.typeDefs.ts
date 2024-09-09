import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMainBanners(offset: Int, sortation: String): [Banner]
  }
`;
