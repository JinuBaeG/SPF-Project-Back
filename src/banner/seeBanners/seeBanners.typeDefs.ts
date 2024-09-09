import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBanners(offset: Int): [Banner]
  }
`;
