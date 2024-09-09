import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeBanner(id: String): Banner
  }
`;
