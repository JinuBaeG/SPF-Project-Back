import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestTournamentHistory(
      contestTournamentGroupId: String
      contestTeamHistoryId: String
      opponentTeamHistoryId: String
      contestTeamId: String
      contestTeamName: String
      groupTierId: String
      contestId: String
    ): MutationResponse
  }
`;
