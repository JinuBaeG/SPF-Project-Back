import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeSportsEvent(offset: Int): [SportsEvent]
  }
`;
