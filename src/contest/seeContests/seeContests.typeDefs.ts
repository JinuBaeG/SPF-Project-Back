import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContests(offset: Int): [Contest]
  }
`;
