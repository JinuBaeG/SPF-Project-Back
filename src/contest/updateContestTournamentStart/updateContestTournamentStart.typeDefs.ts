import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestTournamentStart(
      id: String
      contestTeamId: String
      opponentTeamId: String
    ): MutationResponse
  }
`;
