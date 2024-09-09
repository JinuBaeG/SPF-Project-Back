import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestTournamentHistory(
      contestGroupTierId: String
    ): [ContestTournamentHistory]
  }
`;
