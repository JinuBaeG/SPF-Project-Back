import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestsByDate(date: String, offset: Int): [Contest]
  }
`;
