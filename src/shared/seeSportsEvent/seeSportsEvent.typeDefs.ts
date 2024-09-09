import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeSportsEvent(offset: Int): [SportsEvent]
  }
`;
