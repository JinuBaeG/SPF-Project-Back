import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestGroupMatchTeam(
      contestId: String
      contestTeamId: String
      contestMatchGroupId: String
    ): MutationResponse
  }
`;
