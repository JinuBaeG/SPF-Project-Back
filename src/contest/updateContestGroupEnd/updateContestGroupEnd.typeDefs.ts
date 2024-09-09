import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestGroupEnd(
      id: String
      contestId: String
      contestMatchGroupId: String
      contestTeamId: String
      contestCourtId: String
      matchNo: Int
      matchTimeHour: String
      matchTimeMin: String
      opponentTeamId: String
      contestTeamScore: Int
      opponentTeamScore: Int
    ): MutationResponse
  }
`;
