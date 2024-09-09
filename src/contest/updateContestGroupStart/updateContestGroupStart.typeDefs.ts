import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestGroupStart(
      id: String
      contestTeamId: String
      opponentTeamId: String
    ): MutationResponse
  }
`;
