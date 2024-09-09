import { gql } from "graphql-tag";

export default gql`
  type Query {
    seePhoto(id: String): Photo!
  }
`;
