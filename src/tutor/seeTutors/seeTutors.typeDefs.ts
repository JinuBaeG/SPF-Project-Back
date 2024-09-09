import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeTutors(offset: Int!, sportsEvent: String): [Tutor]
  }
`;
