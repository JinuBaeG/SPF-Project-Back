import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestTournamentEnd(
      id: String
      contestId: String
      contestMatchGroupId: String
      contestTeamId: String
      contestCourtId: String
      nextMatchId: String
      matchNo: Int
      startTimeHour: String
      startTimeMin: String
      opponentTeamId: String
      contestTeamScore: Int
      opponentTeamScore: Int
      topPartyTeamId: String
      bottomPartyTeamId: String
      topPartyTeamName: String
      bottomPartyTeamName: String
    ): MutationResponse
  }
`;
