import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroupMatchHistory(
      contestMatchGroupId: String
    ): [ContestGroupMatchHistory]
  }
`;
