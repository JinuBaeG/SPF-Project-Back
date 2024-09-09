import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroupMatchResult(
      contestMatchGroupId: String
    ): [ContestGroupMatchResult]
  }
`;
