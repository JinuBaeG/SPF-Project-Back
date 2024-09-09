import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeSportsEventMain(offset: Int): [SportsEvent]
  }
`;
