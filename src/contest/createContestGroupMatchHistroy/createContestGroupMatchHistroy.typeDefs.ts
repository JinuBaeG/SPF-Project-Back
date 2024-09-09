import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestGroupMatchHistory(
      contestId: String
      contestTeam: [InputContestTeam]
      contestMatchGroupId: String
    ): MutationResponse
  }

  input InputContestTeam {
    id: String
  }
`;
