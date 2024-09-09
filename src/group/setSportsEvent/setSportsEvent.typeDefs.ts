import { gql } from "graphql-tag";

export default gql`
  type Query {
    setSportsEvent(id: String): Group
  }
`;
