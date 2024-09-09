import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestTournamentSetting(
      id: String
      contestId: String
      contestTeamId: String
      contestCourtId: String
      matchNo: Int
      startTimeHour: String
      startTimeMin: String
      opponentTeamId: String
      contestTeamScore: Int
      opponentTeamScore: Int
    ): MutationResponse
  }
`;
