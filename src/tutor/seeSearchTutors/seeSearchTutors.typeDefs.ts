import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeSearchTutors(offset: Int!, sportsEvent: String): [Tutor]
  }
`;
