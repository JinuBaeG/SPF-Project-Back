import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestTournament(
      contestId: String
      contestGroupId: String
      totalRound: Int
      roundAdvance: Int
    ): MutationResponse
  }
`;
