import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestTierGroup(
      contestId: String
      sportsSort: String
      groupSort: String
    ): [ContestTierGroup]
  }
`;
