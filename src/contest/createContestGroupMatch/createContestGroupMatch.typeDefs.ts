import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestGroupMatch(
      groupNo: Int
      contestId: String
      contestGroupId: String
    ): MutationResponse
  }
`;
